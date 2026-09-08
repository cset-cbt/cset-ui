<script lang="ts">
  import { ScrollArea } from 'bits-ui';

  export let maxHeight: string = '300px';
  export let orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';

  let className = '';
  export { className as class };
</script>

<ScrollArea.Root
  class="relative overflow-hidden rounded-xl border border-border bg-surface {className}"
  style="max-height: {maxHeight};"
>
  <ScrollArea.Viewport class="h-full w-full rounded-[inherit] p-4" style="max-height: {maxHeight};">
    <slot />
  </ScrollArea.Viewport>

  {#if orientation === 'vertical' || orientation === 'both'}
    <ScrollArea.Scrollbar
      orientation="vertical"
      class="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-150 ease-out hover:bg-surface-muted/50 data-[state=visible]:animate-fadeIn"
    >
      <ScrollArea.Thumb class="relative flex-1 rounded-full bg-border-strong/60 transition-colors hover:bg-accent" />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'horizontal' || orientation === 'both'}
    <ScrollArea.Scrollbar
      orientation="horizontal"
      class="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-150 ease-out hover:bg-surface-muted/50 data-[state=visible]:animate-fadeIn"
    >
      <ScrollArea.Thumb class="relative flex-1 rounded-full bg-border-strong/60 transition-colors hover:bg-accent" />
    </ScrollArea.Scrollbar>
  {/if}
</ScrollArea.Root>
