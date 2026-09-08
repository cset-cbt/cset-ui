<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let content: string = '';
  export let shortcut: string = '';
  export let delayDuration: number = 200;
  export let side: 'top' | 'right' | 'bottom' | 'left' = 'top';
  export let align: 'start' | 'center' | 'end' = 'center';
  export let sideOffset: number = 5;

  let className = '';
  export { className as class };
</script>

<Tooltip.Root {delayDuration}>
  <Tooltip.Trigger class="inline-flex outline-none">
    <slot />
  </Tooltip.Trigger>

  <Tooltip.Portal>
    <Tooltip.Content
      {side}
      {align}
      {sideOffset}
      class="z-50 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-muted/95 px-2.5 py-1 font-mono text-[0.68rem] text-ink shadow-lg backdrop-blur-md outline-none ring-1 ring-border/20 {className}"
    >
      <span>{content}</span>
      {#if shortcut}
        <kbd class="rounded border border-border/80 bg-surface px-1 py-0.2 font-mono text-[0.6rem] text-ink-muted">
          {shortcut}
        </kbd>
      {/if}
      <slot name="content" />
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>
