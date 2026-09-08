<script lang="ts">
  import { Switch } from 'bits-ui';

  export let checked: boolean = false;
  export let name: string | undefined = undefined;
  export let label: string = '';
  export let description: string = '';
  export let disabled: boolean = false;
  export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;

  let className = '';
  export { className as class };

  function handleChange(val: boolean) {
    checked = val;
    onCheckedChange?.(val);
  }
</script>

<div class="inline-flex items-start gap-3 select-none {className}">
  {#if name}
    <input type="hidden" {name} value={checked ? 'true' : 'false'} />
  {/if}

  <Switch.Root
    bind:checked
    {disabled}
    onCheckedChange={handleChange}
    class="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface data-[state=checked]:bg-accent data-[state=checked]:border-accent disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Switch.Thumb
      class="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
    />
  </Switch.Root>

  {#if label || description}
    <div class="flex flex-col">
      {#if label}
        <span class="font-sans text-xs font-semibold text-ink leading-tight">
          {label}
        </span>
      {/if}
      {#if description}
        <span class="font-sans text-[0.72rem] text-ink-muted leading-relaxed mt-0.5">
          {description}
        </span>
      {/if}
    </div>
  {/if}
</div>
