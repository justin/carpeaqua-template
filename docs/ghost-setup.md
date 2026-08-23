# Setting up the carpeaqua theme in Ghost

Everything Ghost-side that this theme needs. Step 0 and steps 1–2 are the ones
that have to happen for the site to work at all; the rest is configuration you
can do in any order afterwards.

Requires **Ghost 6.38.0 or later** — the footer uses the `{{#social_accounts}}`
helper, which does not exist before that version.

None of this is scriptable via the Admin API, which is worth knowing before you
try. Integration keys are restricted to a fixed permission set, and every call
needed here — `PUT /settings/`, `POST /settings/routes/yaml/`, `GET /themes/`,
`GET /custom_theme_settings/` — returns *"API tokens do not have permission to
access this endpoint"*. Only `pages/` and `images/upload/` are reachable. These
are one-time setup steps, so the UI is the path.

---

## 0. Build first

`assets/built/` is generated and gitignored, so a fresh clone has no CSS, no
JavaScript and no images until you build:

```bash
npm ci && npm run build
```

Everything below assumes that has been run. `npm run dev` does the same build and
then watches `assets/css/` and `assets/images/` for changes.

## 1. Install the theme

**Locally (devcontainer):** nothing to upload. `.devcontainer/devcontainer.json`
bind-mounts the repository straight into
`/home/node/ghost/content/themes/carpeaqua-template`, so Ghost already sees the
working tree — edits to `.hbs` files show up on reload, and `npm run dev`
rebuilds CSS and images in place. The theme still has to be *activated* once,
since a fresh `ghost install local` starts on Casper:

**Settings → Design & branding → Change theme → carpeaqua → Activate.**

**Production (Ghost Pro):** pushing to `main` deploys automatically —
`.github/workflows/deploy.yml` builds the assets and uploads the theme through
the Admin API. To do it by hand instead, build a zip and upload it under the same
menu:

```bash
npm run zip
```

That builds and then writes `production/carpeaqua.zip` — templates, built assets,
partials, `package.json`, and `routes.yaml`. Repo-local tooling (`docs/`,
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

## 3. Homepage content

Nothing to do in Ghost. The portfolio sections live in the theme, one partial per
section under `partials/home/`:

| Partial | Section | Anchor |
|---------|---------|--------|
| `hero.hbs` | Hello / about | `#about` |
| `career.hbs` | Career Stops | `#career` |
| `education.hbs` | Education | `#education` |
| `skills.hbs` | Technical Prowess | `#skills` |
| `projects.hbs` | Projects | `#projects` |

[`home.hbs`](../home.hbs) includes those in order, then appends three more
sections: **Essays & Writing** (the latest five posts, pulled live), the
**Subscribe CTA**, and **Contact** (`#contact`). Contact is kept inline in
`home.hbs` rather than extracted into a partial so that it stays the final
section whatever gets added above it.

The nav links in the site header point at the anchors above, so keep the `id`
attributes on each `<section>` intact.

Editing any of this is a code change and a deploy, not a Ghost Admin edit. In exchange, Tailwind utility classes and Handlebars
helpers both work — neither does inside page content stored in Ghost's database,
because Tailwind only scans the theme's own files at build time and Ghost does not
evaluate helpers in post or page HTML.

### Career timeline

The seven entries share their markup, so they go through a block partial. Each
call passes the logo and headings as hash params and the prose as the block:

```handlebars
{{#> "home/timeline-item" logo="built/portfolio/logo-ted.png" company="TED" role="Mobile Development Lead"}}
  <p>Led development of visual redesign that shipped in June 2018. …</p>
{{/"home/timeline-item"}}
```

`role` is optional (Second Gear has none). The connecting rail is emitted for
every entry — `.timeline__item:last-child .timeline__connector` hides it in CSS —
so appending a new job is one block, with nothing to adjust on the entry above it.

### Images

The nine portfolio images are theme assets, referenced with `{{asset}}`. Sources
live in `assets/images/portfolio/` and `gulp images` copies them to
`assets/built/portfolio/`, which is what ships in the zip:

| File | Used by |
|------|---------|
| `justin-williams.jpg` | Hero photo |
| `purdue.jpg` | Education |
| `logo-spatial.png`, `logo-pff.png`, `logo-neurotrack.png`, `logo-ted.png`, `logo-hipstamatic.png`, `logo-hoteltonight.png`, `logo-secondgear.png` | Career timeline, in that order |

They are not uploaded to Ghost and there is nothing to wire up per-environment —
`{{asset}}` resolves against whatever host is serving the theme.

The originals were pre-processed rather than used as-is: the hero shot is cropped
to head-and-shoulders (the original is a restaurant photo including the table),
and each logo is letterboxed onto a square white canvas. That last part matters —
`.timeline__logo` is a 72px circle with `object-cover`, so a wide mark like TED's
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

The form lives in [`home.hbs`](../home.hbs) and posts to **Formspree**, form ID
`mrpzolqp`. Nothing to configure in Ghost — no backend, no Ghost setting.

Submissions go through `@formspree/ajax`, loaded from unpkg, so the page does not
navigate away on submit; the `data-fs-*` attributes on the fields are what that
library binds to for inline validation and the success and error messages. The
`<form action>` is a plain Formspree endpoint, so if the script fails to load the
form still submits as a normal POST and Formspree renders its own confirmation
page. A hidden `_gotcha` field catches basic bots.

Changing the destination means editing both the `action` attribute and the
`formId` in the inline `formspree('initForm', …)` call — they have to match.

## 8. Verify

- `/` shows the portfolio: hero, career timeline, education, skills, projects.
  These are theme partials, so they can't go missing the way page content could;
  broken images mean `assets/built/portfolio/` didn't make it into the zip.
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
