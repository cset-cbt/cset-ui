<script lang="ts">
  export let variant: 'text' | 'circular' | 'rectangular' = 'rectangular';
  export let width: string = '';
  export let height: string = '';
  export let lines: number = 1;

  let className = '';
  export { className as class };

  $: baseStyles = (() => {
    switch (variant) {
      case 'circular':
        return `rounded-full ${width ? '' : 'w-10'} ${height ? '' : 'h-10'}`;
      case 'text':
        return `rounded-md h-4 ${width ? '' : 'w-full'}`;
      case 'rectangular':
      default:
        return `rounded-xl ${width ? '' : 'w-full'} ${height ? '' : 'h-24'}`;
    }
  })();
</script>

{#if variant === 'text' && lines > 1}
  <div class="space-y-2 w-full {className}">
    {#each Array(lines) as _, i}
      <div
        class="rounded-md bg-surface-muted/80 animate-pulse {i === lines - 1 ? 'w-4/5' : 'w-full'}"
        style="{height ? `height: ${height};` : 'height: 1rem;'}"
        aria-hidden="true"
      ></div>
    {/each}
  </div>
{:else}
  <div
    class="bg-surface-muted/80 animate-pulse {baseStyles} {className}"
    style="{width ? `width: ${width};` : ''} {height ? `height: ${height};` : ''}"
    aria-hidden="true"
  ></div>
{/if}
