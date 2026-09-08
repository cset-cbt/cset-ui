<script module lang="ts">
  export type SelectOption = {
    value: string;
    label: string;
    color?: string;
    disabled?: boolean;
  };
</script>

<script lang="ts">
  import { Select } from 'bits-ui';
  export let label: string = '';
  export let items: SelectOption[] = [];
  export let value: string = '';
  export let placeholder: string = 'Chọn...';
  export let name: string | undefined = undefined;
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let size: 'sm' | 'md' | 'field' = 'field';
  export let onValueChange: ((val: string) => void) | undefined = undefined;

  let className = '';
  export { className as class };

  function handleValueChange(val: string | undefined) {
    if (val !== undefined) {
      value = val;
      onValueChange?.(val);
    }
  }

  $: selectedItem = items.find((i) => i.value === value);
</script>

<div class="flex flex-col relative w-full {className}">
  {#if label}
    <span class="mono-label text-xs text-ink-muted mb-1.5 block">
      {label}
    </span>
  {/if}

  {#if name}
    <input type="hidden" {name} {value} {required} />
  {/if}

  <Select.Root
    type="single"
    bind:value
    {name}
    {disabled}
    {required}
    onValueChange={handleValueChange}
  >
    <Select.Trigger
      class="select-trigger {size === 'sm' ? 'select-trigger--sm' : size === 'md' ? 'select-trigger--md' : 'select-trigger--field'} w-full"
      aria-label={placeholder}
    >
      <div class="flex items-center gap-2 truncate pr-2">
        {#if selectedItem?.color}
          <span
            class="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs"
            style="background-color: {selectedItem.color};"
          ></span>
        {/if}
        <span class="truncate font-mono text-xs text-ink select-none">
          {selectedItem?.label ?? placeholder}
        </span>
      </div>
      <span class="select-chevron ml-1 shrink-0" aria-hidden="true">
        <svg class="h-3.5 w-3.5 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content class="select-popover glass-card corner-ticks z-50 rounded-xl border border-border bg-surface/98 backdrop-blur-xl p-1 shadow-2xl min-w-[200px]">
        <Select.Viewport class="p-1 max-h-60 overflow-y-auto space-y-0.5">
          {#each items as item (item.value)}
            <Select.Item
              value={item.value}
              label={item.label}
              disabled={item.disabled}
              class="select-item flex items-center justify-between gap-2 rounded-lg px-3 py-2 font-mono text-xs text-ink cursor-pointer transition-colors outline-none select-none data-[highlighted]:bg-surface-muted data-[highlighted]:text-accent data-[selected]:font-bold data-[selected]:text-accent"
            >
              <div class="flex items-center gap-2 truncate pr-2">
                {#if item.color}
                  <span
                    class="h-2 w-2 rounded-full shrink-0 shadow-xs"
                    style="background-color: {item.color};"
                  ></span>
                {/if}
                <span class="truncate">{item.label}</span>
              </div>
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
</div>
