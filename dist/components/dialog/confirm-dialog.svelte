<script lang="ts">
  import Dialog from './dialog.svelte';
  import Button from '../button.svelte';

  export let open: boolean = false;
  export let title: string = 'Xác nhận hành động';
  export let description: string = 'Bạn có chắc chắn muốn thực hiện hành động này? Thao tác này không thể hoàn tác.';
  export let confirmText: string = 'Xác nhận';
  export let cancelText: string = 'Hủy bỏ';
  export let variant: 'danger' | 'primary' = 'danger';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let onConfirm: (() => void) | undefined = undefined;
  export let onCancel: (() => void) | undefined = undefined;

  function handleConfirm() {
    open = false;
    onConfirm?.();
  }

  function handleCancel() {
    open = false;
    onCancel?.();
  }
</script>

<Dialog
  bind:open
  {title}
  {description}
  {size}
>
  <div class="space-y-5 font-sans">
    <div class="text-sm sm:text-base text-ink leading-relaxed">
      <slot />
    </div>

    <div class="flex items-center justify-end gap-3 pt-4 border-t border-border">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onclick={handleCancel}
      >
        {cancelText}
      </Button>
      <Button
        type="button"
        {variant}
        size="sm"
        onclick={handleConfirm}
      >
        {confirmText}
      </Button>
    </div>
  </div>
</Dialog>
