<script module lang="ts">
  export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
  };
</script>

<script lang="ts">
  import { Select } from 'bits-ui';
  export let items: SelectOption[] = [];
  export let value: string = '';
  export let placeholder: string = 'Chọn...';
  export let name: string | undefined = undefined;
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let size: 'sm' | 'md' = 'sm';

  let className = '';
  export { className as class };

  function handleValueChange(val: string | undefined) {
    if (val !== undefined) {
      value = val;
    }
  }

  $: selectedLabel = items.find((i) => i.value === value)?.label;
</script>

<Select.Root
  type="single"
  bind:value
  {name}
  {disabled}
  {required}
  onValueChange={handleValueChange}
>
  <Select.Trigger
    class="select-trigger {size === 'sm' ? 'select-trigger--sm' : 'select-trigger--md'} {className}"
    aria-label={placeholder}
  >
    <span class="truncate font-mono text-xs text-ink select-none">
      {selectedLabel ?? placeholder}
    </span>
    <span class="select-chevron ml-1 shrink-0" aria-hidden="true">
      <svg class="h-3 w-3 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  </Select.Trigger>

  <Select.Portal>
    <Select.Content class="select-popover glass-card corner-ticks z-50 rounded-md border border-border bg-surface p-1 shadow-xl">
      <Select.Viewport class="p-1 max-h-60 overflow-y-auto space-y-0.5">
        {#each items as item (item.value)}
          <Select.Item
            value={item.value}
            label={item.label}
            disabled={item.disabled}
            class="select-item flex items-center justify-between gap-2 rounded px-2.5 py-1.5 font-mono text-xs text-ink cursor-pointer transition-colors outline-none select-none data-[highlighted]:bg-surface-muted data-[highlighted]:text-accent data-[selected]:font-bold data-[selected]:text-accent"
          >
            <span>{item.label}</span>
            {#if item.value === value}
              <svg class="h-3.5 w-3.5 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            {/if}
          </Select.Item>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
