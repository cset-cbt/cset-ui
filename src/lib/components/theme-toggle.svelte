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
    border-radius: 2px;
    border: 1px solid var(--ui-border-strong);
    background: var(--ui-surface-muted);
    cursor: pointer;
    padding: 0;
  }
  :global(.theme-switch__icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ui-ink-muted);
  }
  :global(.theme-switch__icon--sun) {
    left: 0.3rem;
  }
  :global(.theme-switch__icon--moon) {
    right: 0.3rem;
  }
  :global(.theme-switch__thumb) {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 1.15rem;
    height: 1.15rem;
    border-radius: 1px;
    background: var(--ui-accent-solid);
    transition: transform 150ms ease;
  }
  :global(.theme-switch[data-state='checked'] .theme-switch__thumb) {
    transform: translateX(1.2rem);
  }
</style>
