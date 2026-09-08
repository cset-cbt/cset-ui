<script lang="ts">
  import { Popover } from 'bits-ui';
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let open: boolean = false;
  export let onOpenChange: ((open: boolean) => void) | undefined = undefined;
  export let side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  export let align: 'start' | 'center' | 'end' = 'center';
  export let sideOffset: number = 6;

  let className = '';
  export { className as class };
</script>

<Popover.Root bind:open {onOpenChange}>
  <Popover.Trigger class="outline-none">
    <slot name="trigger" />
  </Popover.Trigger>

  <Popover.Portal>
    <Popover.Content
      {side}
      {align}
      {sideOffset}
      class="z-50 rounded-xl border border-border bg-surface/98 p-3 shadow-2xl backdrop-blur-xl outline-none ring-1 ring-border/20 {className}"
    >
      <slot />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
