<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let href: string | undefined = undefined;
  let className = '';
  export { className as class };

  const base =
    'mono-label inline-flex items-center justify-center gap-2 rounded-sm px-4 py-[0.7rem] text-[0.8rem] cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-50';

  $: variantClass =
    variant === 'secondary'
      ? 'bg-transparent border border-border-strong text-ink'
      : variant === 'danger'
        ? 'btn-solid bg-danger-solid text-on-danger-solid'
        : 'btn-solid bg-accent-solid text-on-accent-solid';
</script>

{#if href}
  <a {href} class="{base} {variantClass} {className}" {...$$restProps} on:click>
    <slot />
  </a>
{:else}
  <button class="{base} {variantClass} {className}" {...$$restProps} on:click>
    <slot />
  </button>
{/if}

<style>
  .btn-solid {
    border: 1px solid transparent;
  }
  :global([data-theme='dark']) .btn-solid {
    border-color: var(--ui-border-strong);
  }
</style>
