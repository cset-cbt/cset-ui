<script module lang="ts">
  export interface TabItem {
    value: string;
    label: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import { Tabs } from 'bits-ui';
  export let value: string = '';
  export let items: TabItem[] = [];
  export let variant: 'segmented' | 'line' = 'segmented';
  export let onValueChange: ((val: string) => void) | undefined = undefined;

  let className = '';
  export { className as class };

  function handleValueChange(val: string | undefined) {
    if (val !== undefined) {
      value = val;
      onValueChange?.(val);
    }
  }
</script>

<Tabs.Root bind:value onValueChange={handleValueChange} class="w-full space-y-4 {className}">
  <Tabs.List
    class={variant === 'segmented'
      ? 'inline-flex items-center gap-1 rounded-xl border border-border bg-surface-muted/60 p-1 font-mono text-xs'
      : 'flex items-center gap-6 border-b border-border font-mono text-xs'}
  >
    {#each items as item (item.value)}
      <Tabs.Trigger
        value={item.value}
        disabled={item.disabled}
        class={variant === 'segmented'
          ? 'px-3 py-1.5 rounded-lg transition-all text-xs font-medium select-none cursor-pointer data-[state=active]:bg-surface data-[state=active]:text-accent data-[state=active]:font-bold data-[state=active]:shadow-xs text-ink-muted hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed'
          : 'relative py-2.5 transition-all text-xs select-none cursor-pointer data-[state=active]:text-accent data-[state=active]:font-bold text-ink-muted hover:text-ink data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-accent disabled:opacity-40 disabled:cursor-not-allowed'}
      >
        {item.label}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>

  <slot />
</Tabs.Root>
