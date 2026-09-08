<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let open: boolean = false;
  export let onOpenChange: ((open: boolean) => void) | undefined = undefined;
  export let side: 'right' | 'left' | 'bottom' | 'top' = 'right';
  export let title: string = '';
  export let description: string = '';

  $: sideStyles = (() => {
    switch (side) {
      case 'left':
        return {
          wrapper: 'fixed inset-y-0 left-0 z-50 h-full w-full max-w-md border-r border-border',
          flyParams: { x: -320, duration: 220, easing: cubicOut }
        };
      case 'bottom':
        return {
          wrapper: 'fixed inset-x-0 bottom-0 z-50 max-h-[85vh] w-full border-t border-border rounded-t-2xl',
          flyParams: { y: 320, duration: 220, easing: cubicOut }
        };
      case 'top':
        return {
          wrapper: 'fixed inset-x-0 top-0 z-50 max-h-[85vh] w-full border-b border-border rounded-b-2xl',
          flyParams: { y: -320, duration: 220, easing: cubicOut }
        };
      case 'right':
      default:
        return {
          wrapper: 'fixed inset-y-0 right-0 z-50 h-full w-full max-w-md border-l border-border',
          flyParams: { x: 320, duration: 220, easing: cubicOut }
        };
    }
  })();
</script>

<Dialog.Root bind:open {onOpenChange}>
  {#if $$slots.trigger}
    <Dialog.Trigger class="outline-none">
      <slot name="trigger" />
    </Dialog.Trigger>
  {/if}

  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

    <Dialog.Content class="{sideStyles.wrapper} bg-surface/98 p-6 shadow-2xl backdrop-blur-xl outline-none overflow-y-auto flex flex-col justify-between">
      <div
        class="w-full h-full flex flex-col justify-between"
        transition:fly={sideStyles.flyParams}
      >
        <div>
          {#if title || $$slots.header}
            <div class="flex items-start justify-between border-b border-border pb-3 mb-4">
              <div>
                {#if title}
                  <Dialog.Title class="text-lg font-bold tracking-tight text-ink">
                    {title}
                  </Dialog.Title>
                {/if}
                {#if description}
                  <Dialog.Description class="mt-1 font-sans text-xs text-ink-muted leading-relaxed">
                    {description}
                  </Dialog.Description>
                {/if}
                <slot name="header" />
              </div>

              <Dialog.Close
                class="grid h-7 w-7 place-items-center rounded text-ink-muted hover:bg-surface-muted hover:text-ink text-sm font-bold font-mono transition-colors"
                aria-label="Đóng bảng điều khiển"
              >
                &times;
              </Dialog.Close>
            </div>
          {/if}

          <div class="space-y-4">
            <slot />
          </div>
        </div>

        {#if $$slots.footer}
          <div class="mt-6 flex items-center justify-end gap-2.5 border-t border-border pt-4">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
