# cset-ui

Shared UI components for CSET club web apps — Svelte 5 + Tailwind CSS v4 + [bits-ui](https://bits-ui.com), styled in the club's Blueprint/Schematic design system (self-hosted Geist fonts, navy/PCB-blue palette, dot-grid background, corner-tick and circuit-trace accents, accessible light/dark theme switch).

Not published to npm — install directly from GitHub.

## Install

```bash
pnpm add github:cset-cbt/cset-ui#v0.1.0
```

Pin to a tag (shown above) or a commit SHA for reproducible installs. Requires `svelte@^5` and `@sveltejs/kit@^2` in the consuming app (peer dependencies) and Tailwind CSS v4 with `@tailwindcss/vite`.

## Set up in a SvelteKit + Tailwind v4 app

In your app's `src/app.css`:

```css
@import 'tailwindcss';
@import 'cset-ui/styles.css';
```

That's it — no extra Tailwind `@source` config needed in your app. `cset-ui/styles.css` declares its own `@source` pointing at this package's component files, and Tailwind v4 follows `@source`/`@theme` through `@import` chains, so your build automatically picks up every utility class used inside `cset-ui`'s components. Fonts are plain relative `url()`s in the same file, so Vite's asset pipeline bundles them into your build automatically too — no manual font-copying step.

Then set `data-theme="light"` or `"dark"` on `<html>` (see `applyTheme`/`readTheme` below) and add an anti-flash inline script in `app.html` that sets it before first paint, same pattern as any of the CSET apps' `src/app.html`.

## Usage

```svelte
<script lang="ts">
  import { Card, Button, InputField, PageHeader, ThemeToggle } from 'cset-ui';
</script>

<Card>
  <PageHeader eyebrow="My App" title="Hello">Some description.</PageHeader>
  <InputField label="Email" name="email" type="email" required />
  <Button type="submit">Submit</Button>
</Card>
```

Exports: `Logo`, `Button`, `Card`, `PageHeader`, `InputField`, `FormMessage`, `ThemeToggle`, `VersionBadge`, `CircuitDivider`, `KeyboardIllustration`, plus `readTheme`/`applyTheme`/`Theme` from the theme utility.

`VersionBadge` reads `$app/environment`'s `version`, which reflects whichever consuming app renders it — set `kit.version.name` in that app's own `svelte.config.js` from its own `package.json` version.

## Design tokens

All components read CSS custom properties (`--ui-*`, `--brand-*`) defined in `styles.css`'s light/dark `[data-theme]` blocks. To reskin an app slightly without forking a component, override the relevant `--ui-*` variable in that app's own CSS after the `cset-ui/styles.css` import — don't edit files inside `node_modules`.

## Releasing a new version

This repo ships its **built** output in git (`dist/`, `styles.css` at the repo root) rather than relying on a build-on-install step, since pnpm ignores lifecycle scripts (`prepare`/`postinstall`) from git dependencies by default unless explicitly allowlisted. So after editing `src/lib/`:

```bash
pnpm run package   # rebuilds dist/ and styles.css
git add -A
git commit -m "..."
git tag vX.Y.Z
git push && git push --tags
```

Consuming apps pin an exact tag/SHA (see Install above) and bump it deliberately — there's no auto-update. A component change here can affect every app using it; review before bumping a consumer's pinned ref.

## Local development

```bash
pnpm install
pnpm run check     # svelte-check
pnpm run package   # build dist/ + copy styles.css
```

There's no dev server / preview app in this repo (component-only package). To preview changes, consume it via a `file:` link from a throwaway app, or link it into one of the real CSET apps on a branch.
