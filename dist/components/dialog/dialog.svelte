<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let open: boolean = false;
  export let onOpenChange: ((open: boolean) => void) | undefined = undefined;
  export let title: string = '';
  export let description: string = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  $: sizeClasses = (() => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      case 'full':
        return 'max-w-[95vw] min-h-[90vh]';
      case 'md':
      default:
        return 'max-w-lg';
    }
  })();
</script>

<Dialog.Root bind:open {onOpenChange}>
  {#if $$slots.trigger}
    <Dialog.Trigger asChild let:builder>
      <slot name="trigger" {builder} />
    </Dialog.Trigger>
  {/if}

  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      transition={fade}
      transitionConfig={{ duration: 180 }}
    />
    <Dialog.Content
      class="fixed left-1/2 top-1/2 z-50 w-full {sizeClasses} -translate-x-1/2 -translate-y-1/2 p-4 outline-none"
      transition={scale}
      transitionConfig={{ start: 0.94, duration: 200, opacity: 0, easing: cubicOut }}
    >
      <div class="relative w-full rounded-2xl border border-border bg-surface p-6 shadow-2xl backdrop-blur-xl">
        <!-- Header -->
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
              aria-label="Đóng hộp thoại"
            >
              &times;
            </Dialog.Close>
          </div>
        {/if}

        <!-- Body -->
        <div class="space-y-4">
          <slot />
        </div>

        <!-- Footer -->
        {#if $$slots.footer}
          <div class="mt-5 flex items-center justify-end gap-2.5 border-t border-border pt-3">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
