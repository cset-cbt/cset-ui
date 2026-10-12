<script lang="ts">
  import { onMount } from 'svelte';
  import { Switch } from 'bits-ui';
  import { readTheme, applyTheme, type Theme } from '../theme';

  let theme: Theme = 'light';

  onMount(() => {
    theme = readTheme();
  });

  function onCheckedChange(checked: boolean) {
    theme = checked ? 'dark' : 'light';
    applyTheme(theme);
  }

  $: label = theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
</script>

<Switch.Root checked={theme === 'dark'} {onCheckedChange} aria-label={label} class="theme-switch">
  <svg
    class="theme-switch__icon theme-switch__icon--sun"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
    />
  </svg>
  <svg
    class="theme-switch__icon theme-switch__icon--moon"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
  </svg>
  <Switch.Thumb class="theme-switch__thumb" />
</Switch.Root>

<style>
  :global(.theme-switch) {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 999px;
    border: 1px solid var(--ui-border-strong);
    background: var(--ui-surface-muted);
    cursor: pointer;
    padding: 2px;
    transition: transform 120ms ease, background-color 150ms ease, border-color 150ms ease;
  }
  :global(.theme-switch:active) {
    transform: scale(0.95);
  }
  :global(.theme-switch__icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ui-ink-muted);
    transition: opacity 150ms ease, color 150ms ease;
    pointer-events: none;
  }
  :global(.theme-switch__icon--sun) {
    left: 0.35rem;
  }
  :global(.theme-switch__icon--moon) {
    right: 0.35rem;
  }
  :global(.theme-switch__thumb) {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(1.5rem - 6px);
    height: calc(1.5rem - 6px);
    border-radius: 999px;
    background: var(--ui-accent-solid);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  :global(.theme-switch[data-state='checked'] .theme-switch__thumb) {
    transform: translateX(1.25rem);
  }
</style>
