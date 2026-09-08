<script module lang="ts">
  export interface RadioItem {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import { RadioGroup } from 'bits-ui';

  export let value: string = '';
  export let items: RadioItem[] = [];
  export let name: string | undefined = undefined;
  export let onValueChange: ((val: string) => void) | undefined = undefined;

  let className = '';
  export { className as class };

  function handleChange(val: string) {
    value = val;
    onValueChange?.(val);
  }
</script>

{#if name}
  <input type="hidden" {name} {value} />
{/if}

<RadioGroup.Root bind:value onValueChange={handleChange} class="space-y-3 {className}">
  {#each items as item (item.value)}
    <label
      class="flex items-start gap-3 select-none cursor-pointer rounded-lg border border-border bg-surface p-3 transition-colors hover:bg-surface-muted/30 {value === item.value ? 'border-accent/80 bg-accent/5' : ''} {item.disabled ? 'cursor-not-allowed opacity-50' : ''}"
    >
      <RadioGroup.Item
        value={item.value}
        disabled={item.disabled}
        class="mt-0.5 aspect-square h-4 w-4 rounded-full border border-border bg-surface flex items-center justify-center text-accent ring-offset-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 data-[state=checked]:border-accent"
      >
        {#if value === item.value}
          <div class="h-2 w-2 rounded-full bg-accent"></div>
        {/if}
      </RadioGroup.Item>

      <div class="flex flex-col">
        <span class="font-sans text-xs font-semibold text-ink leading-tight">
          {item.label}
        </span>
        {#if item.description}
          <span class="font-sans text-[0.72rem] text-ink-muted leading-relaxed mt-0.5">
            {item.description}
          </span>
        {/if}
      </div>
    </label>
  {/each}
</RadioGroup.Root>
