<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let checked: boolean = false;
  export let name: string | undefined = undefined;
  export let label: string = '';
  export let disabled: boolean = false;
  export let onCheckedChange: ((checked: boolean) => void) | undefined = undefined;

  let className = '';
  export { className as class };

  function handleChange(val: boolean) {
    checked = val;
    onCheckedChange?.(val);
  }
</script>

<label class="inline-flex items-center gap-2.5 select-none cursor-pointer {disabled ? 'cursor-not-allowed opacity-50' : ''} {className}">
  {#if name}
    <input type="hidden" {name} value={checked ? 'true' : 'false'} />
  {/if}

  <Checkbox.Root
    bind:checked
    {disabled}
    onCheckedChange={handleChange}
    class="peer h-4 w-4 shrink-0 rounded border border-border bg-surface shadow-xs transition-all flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface data-[state=checked]:bg-accent data-[state=checked]:border-accent disabled:cursor-not-allowed disabled:opacity-50"
  >
    {#if checked}
      <span transition:scale={{ duration: 100, easing: cubicOut }}>
        <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    {/if}
  </Checkbox.Root>

  {#if label}
    <span class="font-sans text-xs text-ink">
      {label}
    </span>
  {/if}
</label>
