<script module lang="ts">
  export interface MenuItem {
    id: string;
    label: string;
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean;
    onSelect?: () => void;
  }
</script>

<script lang="ts">
  import { DropdownMenu } from 'bits-ui';

  export let items: (MenuItem | 'separator')[] = [];
  export let open: boolean = false;
  export let side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  export let align: 'start' | 'center' | 'end' = 'end';
  export let sideOffset: number = 4;

  let className = '';
  export { className as class };
</script>

<DropdownMenu.Root bind:open>
  <DropdownMenu.Trigger class="outline-none">
    <slot name="trigger" />
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content
      {side}
      {align}
      {sideOffset}
      class="z-50 min-w-[180px] rounded-xl border border-border bg-surface/98 p-1.5 shadow-2xl backdrop-blur-xl outline-none ring-1 ring-border/20 {className}"
    >
      {#each items as item}
        {#if item === 'separator'}
          <div class="my-1 h-px bg-border"></div>
        {:else}
          <DropdownMenu.Item
            disabled={item.disabled}
            class="flex items-center justify-between rounded-lg px-2.5 py-1.5 font-mono text-xs cursor-pointer select-none outline-none transition-colors {item.danger
              ? 'text-rose-500 hover:bg-rose-500/10'
              : 'text-ink hover:bg-surface-muted hover:text-accent'} disabled:opacity-40 disabled:cursor-not-allowed"
            onSelect={item.onSelect}
          >
            <span>{item.label}</span>
            {#if item.shortcut}
              <span class="ml-3 font-mono text-[0.62rem] text-ink-muted">
                {item.shortcut}
              </span>
            {/if}
          </DropdownMenu.Item>
        {/if}
      {/each}
      <slot />
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
