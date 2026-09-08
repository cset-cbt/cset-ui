<script lang="ts">
  import { toasts } from './toast-store';
  import Toast from './toast.svelte';

  export let position:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-center' = 'bottom-right';

  $: positionClasses = (() => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4 items-start';
      case 'top-center':
        return 'top-4 left-1/2 -translate-x-1/2 items-center';
      case 'top-right':
        return 'top-4 right-4 items-end';
      case 'bottom-left':
        return 'bottom-4 left-4 items-start';
      case 'bottom-center':
        return 'bottom-4 left-1/2 -translate-x-1/2 items-center';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4 items-end';
    }
  })();
</script>

<div
  class="pointer-events-none fixed z-50 flex w-full max-w-sm flex-col gap-2 p-4 {positionClasses}"
  aria-label="Thông báo hệ thống"
>
  {#each $toasts as item (item.id)}
    <div class="pointer-events-auto w-full">
      <Toast toast={item} />
    </div>
  {/each}
</div>
