// Minimal Ghost Admin API client: reads GHOST_ADMIN_KEY from .env.local,
// mints a short-lived HS256 JWT per request, and wraps fetch.
//
// The Admin API key is `id:secret`, where the secret is hex and must be decoded
// to bytes before signing. Tokens are capped at 5 minutes by Ghost; we use 60s.

import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  let raw;
  try {
    raw = readFileSync(join(ROOT, '.env.local'), 'utf8');
  } catch {
    throw new Error('.env.local not found at the repository root.');
  }
  const env = {};
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
  }
  return env;
}

const env = loadEnv();
export const GHOST_URL = (env.GHOST_URL || 'http://localhost:2368').replace(/\/$/, '');

const key = env.GHOST_ADMIN_KEY;
if (!key) throw new Error('GHOST_ADMIN_KEY missing from .env.local');
if (!/^[0-9a-f]+:[0-9a-f]+$/.test(key)) {
  throw new Error(
    'GHOST_ADMIN_KEY is not in the expected `id:secret` hex form. ' +
      'Copy the Admin API key (not the Content API key) from the integration.'
  );
}

const [keyId, keySecret] = key.split(':');

const b64url = (input) =>
  Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

function token() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: keyId }));
  const payload = b64url(JSON.stringify({ iat: now, exp: now + 60, aud: '/admin/' }));
  const sig = createHmac('sha256', Buffer.from(keySecret, 'hex'))
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${header}.${payload}.${sig}`;
}

/**
 * Call the Admin API. `path` is relative to /ghost/api/admin/.
 * Pass `body` for JSON, or `form` (FormData) for uploads.
 */
export async function api(path, { method = 'GET', body, form, headers = {} } = {}) {
  const url = `${GHOST_URL}/ghost/api/admin/${path.replace(/^\//, '')}`;
  const init = {
    method,
    headers: { Authorization: `Ghost ${token()}`, ...headers },
  };
  if (form) {
    init.body = form;
  } else if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON response (HTML error page, empty body) */
  }

  if (!res.ok) {
    const detail = json?.errors?.map((e) => `${e.message}${e.context ? ` — ${e.context}` : ''}`).join('; ');
    const err = new Error(`${method} ${path} → ${res.status}: ${detail || text.slice(0, 200)}`);
    err.status = res.status;
    err.body = json ?? text;
    throw err;
  }
  return json;
}
