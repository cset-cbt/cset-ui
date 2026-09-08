<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let open: boolean = false;
  export let title: string = '';

  let className = '';
  export { className as class };

  function toggle() {
    open = !open;
  }
</script>

<div class="w-full rounded-xl border border-border bg-surface overflow-hidden shadow-xs {className}">
  <button
    type="button"
    class="flex w-full items-center justify-between p-3.5 text-left font-sans text-xs font-semibold text-ink hover:text-accent transition-colors select-none cursor-pointer outline-none focus-visible:bg-surface-muted/50"
    on:click={toggle}
    aria-expanded={open}
  >
    {#if title}
      <span>{title}</span>
    {:else}
      <slot name="trigger" />
    {/if}

    <span class="ml-2 shrink-0 text-ink-muted transition-transform duration-200 {open ? 'rotate-180 text-accent' : ''}">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  </button>

  {#if open}
    <div
      transition:slide={{ duration: 180, easing: cubicOut }}
      class="px-3.5 pb-3.5 pt-1 border-t border-border/40 font-sans text-xs text-ink-muted leading-relaxed"
    >
      <slot />
    </div>
  {/if}
</div>
