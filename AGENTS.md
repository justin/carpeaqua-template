# Repository Guidelines

## Project Structure & Module Organization

This repository contains the `carpeaqua` theme for Ghost 5 and later. Top-level Handlebars templates (`default.hbs`, `index.hbs`, `post.hbs`, `page.hbs`, and `error.hbs`) define page layouts. Reusable template fragments live in `partials/`. Edit Tailwind source styles in `assets/css/main.css` and source images in `assets/images/`; Gulp writes deployable files to `assets/built/`. Keep built assets in sync with their sources. Local Ghost data under `.devcontainer/server/` and packaged themes under `production/` are ignored.

## Build, Test, and Development Commands

- Use Node 22, matching CI and the dev container; `npm ci` installs the exact dependency versions in `package-lock.json`.
- `npm run dev` builds Tailwind/PostCSS, Prism JavaScript, and images, then watches CSS and image sources.
- `npm test` runs Ghost's `gscan` theme compatibility checks.
- `npm run test:ci` runs verbose, fatal `gscan` validation, matching CI.
- `npm run zip` rebuilds the theme and creates `production/carpeaqua.zip`.

The dev container installs and starts a local Ghost instance on port `2368`, with this repository mounted as its theme.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, spaces, two-space indentation, and no trailing whitespace (except where Markdown requires it). Format Handlebars with Prettier using the repository's Glimmer configuration; for example, `npx prettier --write '*.hbs' 'partials/*.hbs'`. Use lowercase kebab-case for new asset and partial names. Keep Ghost helpers and contexts explicit, and place reusable markup in `partials/` rather than duplicating it across templates.

## Testing Guidelines

There is no unit-test or coverage suite. Treat `gscan` as the required automated check and run `npm run test:ci` before submitting changes. For layout or styling changes, also activate the theme in local Ghost and verify the index, post, pagination, error, light-mode, and dark-mode views as applicable. Rebuild and inspect `assets/built/` after changing CSS, images, or Prism configuration.

## Commit & Pull Request Guidelines

Recent history uses short, capitalized, present-tense summaries such as `Adjust prettier formatting`; keep subjects focused and omit trailing punctuation. Add a body when the reason or side effects are not obvious. Pull requests should describe the user-visible change, list validation performed, link any relevant issue, and include before/after screenshots for visual work. Keep unrelated changes separate and ensure the CI theme-validation job passes.

## Security & Configuration

Never commit Ghost Admin API credentials or local Ghost content. Deployment reads `GHOST_ADMIN_API_URL` and `GHOST_ADMIN_API_KEY` from GitHub Actions secrets.
