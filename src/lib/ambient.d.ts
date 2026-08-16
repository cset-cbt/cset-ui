// This package is a plain Svelte component library (no SvelteKit routes of its
// own), so `svelte-kit sync` never runs here and the real `$app/environment`
// ambient types aren't generated. `version-badge.svelte` imports it because it
// only makes sense inside a consuming SvelteKit app (which provides the real
// module) — this shim only silences `pnpm check` in this repo.
declare module '$app/environment' {
  export const browser: boolean;
  export const building: boolean;
  export const dev: boolean;
  export const version: string;
}
