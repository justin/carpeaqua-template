# Setting up the carpeaqua theme in Ghost

Everything Ghost-side that this theme needs. Steps 1–3 are the ones that have to
happen for the site to work at all; 4–7 are configuration you can do in any order
afterwards.

Requires **Ghost 6.38.0 or later** — the footer uses the `{{#social_accounts}}`
helper, which does not exist before that version.

None of this is scriptable via the Admin API, which is worth knowing before you
try. Integration keys are restricted to a fixed permission set, and every call
needed here — `PUT /settings/`, `POST /settings/routes/yaml/`, `GET /themes/`,
`GET /custom_theme_settings/` — returns *"API tokens do not have permission to
access this endpoint"*. Only `pages/` and `images/upload/` are reachable. These
are one-time setup steps, so the UI is the path.

---

## 1. Install the theme

**Locally (devcontainer):** nothing to upload. `.devcontainer/devcontainer.json`
bind-mounts the repository straight into
`/home/node/ghost/content/themes/carpeaqua-template`, so Ghost already sees the
working tree — edits to `.hbs` files show up on reload, and `gulp` rebuilds CSS
in place. The theme still has to be *activated* once, since a fresh
`ghost install local` starts on Casper:

**Settings → Design & branding → Change theme → carpeaqua → Activate.**

For cloud development work, the devcontainer also preconfigures AI tooling:
VS Code recommends GitHub Copilot, Claude Code, and OpenAI Codex extensions, and
`post_create.sh` installs the `claude` and `codex` CLIs globally in the container.

**Production (Ghost Pro):** build a zip and upload it under the same menu.

```bash
npm run zip
```

That writes `production/carpeaqua.zip` — templates, built assets, partials,
`package.json`, and `routes.yaml`. Local-only tooling (`scripts/`, `docs/`,
`.devcontainer/`, `.env.local`) is excluded, so nothing local ships to
production.

## 2. Upload routes.yaml

Ghost does **not** read `routes.yaml` out of a theme zip — it's site
configuration, not theme configuration, so it has to be uploaded separately.

**Settings → Labs → Beta features → Routes → Upload routes file**, and pick
[`routes.yaml`](../routes.yaml) from the repository root.

This is what creates the `/blog/` archive. Note that `/` does **not** depend on
it: Ghost uses `home.hbs` for the site root automatically whenever a theme
provides one, so the portfolio homepage renders correctly even with default
routing. What's missing without `routes.yaml` is the paginated post archive —
`/blog/` returns 404, and the only way to reach posts is the five-item writing
grid on the homepage or a direct post URL.

## 3. Create the `home` Page

1. **Pages → New page**.
2. Title it `Home`. The title is never rendered on the front end — `home.hbs`
   pulls only the page's content — but Ghost requires one.
3. Open the settings sidebar (gear icon) and set the **Page URL** slug to
   exactly `home`. This is what `home.hbs` filters on; any other slug and the
   homepage falls back to its "create a Page with the slug home" message.
4. Set **Publish** when you're done editing — a draft page won't be found by the
   `{{#get}}` query.

### Adding the content, one card per section

[`docs/home-page-content.html`](home-page-content.html) is divided into five
blocks marked `CARD 1` through `CARD 5`. Each goes into its own HTML card, in
order:

| Card | Section | Anchor |
|------|---------|--------|
| 1 | Hero / About | `#about` |
| 2 | Career Stops | `#career` |
| 3 | Education | `#education` |
| 4 | Technical Prowess | `#skills` |
| 5 | Projects | `#projects` |

Below these, `home.hbs` appends three theme-owned sections: **Essays & Writing**,
the **Subscribe CTA**, and **Contact** (`#contact`). Contact is deliberately in
the theme rather than the Page so it is always the final section, whatever gets
added to the Page later. Don't add a contact card to the Page — you'd get two.

To add each one: on a new line in the editor, press `/`, type `html`, hit enter,
then paste that card's block (everything after its `CARD n` comment, up to the
next one). Press escape, then repeat on the next line.

Rendered output is byte-identical to pasting all six into a single card. The
reason to split them is editing: changing a job title later means opening one
short card instead of scrolling through 200 lines of markup.

The nav links in the site header point at these anchors, so keep the `id`
attributes on each `<section>` intact.

### Two things that don't work inside page content

- **Tailwind utility classes.** Tailwind scans the theme's source files at build
  time; it never sees content stored in Ghost's database. Typing `flex gap-4`
  into a card produces no CSS. Use only the semantic classnames already defined
  in [`assets/css/main.css`](../assets/css/main.css) — `hero`, `timeline__item`,
  `project-card`, `skills-list`, and so on. If you need something new, add it to
  `main.css` and rebuild the theme.
- **Handlebars helpers.** `{{asset}}`, `{{url}}`, and friends are not evaluated
  in page content. Images need real absolute URLs.

### Images

All nine images are already wired into the reference content, uploaded to
production, and referenced by their real `storage.ghost.io` URLs:

| File | Used by |
|------|---------|
| `justin-williams.jpg` | Hero photo (card 1) |
| `purdue.jpg` | Education (card 3) |
| `logo-spatial.png`, `logo-pff.png`, `logo-neurotrack.png`, `logo-ted.png`, `logo-hipstamatic.png`, `logo-hoteltonight.png`, `logo-secondgear.png` | Career timeline (card 2), in that order |

There's no Admin API way to upload straight to an arbitrary path like
`/content/images/portfolio/` — the upload endpoint always assigns a
`/content/images/<year>/<month>/` path — so the `src` values in card 1–3 are
absolute `storage.ghost.io` URLs rather than theme-relative ones. Being
absolute, they render the same in any environment (local or production);
nothing needs uploading per-environment.

The originals still live in `.devcontainer/server/images/portfolio/` for
reference. If they're ever reprocessed or replaced, re-upload with
`node scripts/upload-portfolio-images.mjs` (requires a production Admin API
key and `GHOST_URL=https://carpeaqua.ghost.io` — not the `carpeaqua.com`
custom domain, which 302s and breaks the POST — in `.env.local`) and update
the `src` values in `docs/home-page-content.html` to the URLs it prints.

The originals were pre-processed rather than used as-is: the hero shot is cropped
to head-and-shoulders (the original is a restaurant photo including the table),
and each logo is letterboxed onto a square white canvas. That last part matters —
`.timeline__logo` is a 56px circle with `object-cover`, so a wide mark like TED's
or PFF's would otherwise be cropped to an unreadable sliver, and a black logo on
transparency would vanish in dark mode.

## 4. Social accounts

Set these in **Settings → General → Social accounts**: X, Facebook, LinkedIn,
Bluesky, Threads, Mastodon, TikTok, YouTube, Instagram. The footer renders an
icon for each one you fill in and skips the rest — no theme change needed to add
or remove a network.

Ghost stores X and Facebook as bare handles (`@carpeaqua`) but the newer seven as
full URLs. The admin UI handles the conversion; it only matters if you're reading
the values back out of the API, where the shapes differ.

**GitHub is the exception.** Ghost has no GitHub field, so it stays a theme
setting: **Settings → Design & branding → Site-wide → GitHub URL**. It defaults
to `https://github.com/justin`. Clear the field to hide the icon.

## 5. Admin toolbar

There's no Handlebars helper for "is the current visitor logged in as staff" —
Ghost deliberately doesn't expose staff sessions to themes. Instead Ghost ships
an **admin toolbar**: a floating bar, visible only to authenticated staff, with
links into the admin panel, edit-this-post, analytics, and comment moderation.

It's injected through `{{ghost_head}}` / `{{ghost_foot}}`, both of which
`default.hbs` already includes, so the theme needs no changes — the toolbar
should appear on its own once you're browsing the site while signed in to
Ghost Admin.

> If it doesn't appear, look for the toggle in Ghost Admin. Ghost's changelog
> describes it as something you enable there, but on 6.57 it corresponds to no
> key in the settings API, so the exact location is unconfirmed — it may now be
> on by default, or stored as a per-user preference.

> Safari note: if the toolbar doesn't appear, turn off **Prevent cross-site
> tracking** in Safari's privacy settings.

## 6. Subscribe form

The Subscribe CTA under the writing grid uses Ghost's native Members signup
(`data-members-form="signup"`), so it needs **Settings → Membership → Subscription
access** set to something other than "Nobody". No external service, no backend.

## 7. Contact form

The form lives in [`home.hbs`](../home.hbs) and ships with **no `action`
attribute** — submitting it currently does nothing. Before publishing, pick a
handler (Formspree, a `mailto:`, a serverless endpoint) and set `action` and
`method` on the `<form>` accordingly. Being in the theme rather than the Page,
this is a code change, not a Ghost Admin one.

## 8. Verify

- `/` shows the portfolio with your hero photo and the career timeline — not the
  "Create a Page in Ghost Admin with the slug home" fallback. That fallback means
  the page is missing, still a draft, or on a different slug.
- `/blog/` returns 200 and shows the post index with pagination → routes.yaml
  took effect. A 404 here means it wasn't uploaded.
- Career timeline shows seven logos, each centred in its circle.
- Footer shows one icon per social account you filled in, plus GitHub.
- The Dark/Light toggle in the header switches themes and survives a reload
  (it's persisted to `localStorage`). Check the PFF and HotelTonight logos in
  dark mode — they're black marks and are the ones most likely to disappear if
  the white-canvas processing ever gets skipped.
- Open a post: the Subscribe CTA and "Filed under" tags render.

Most of these can be checked from the command line without a browser:

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:2368/blog/
```
