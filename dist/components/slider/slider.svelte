<script lang="ts">
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
  export let disabled: boolean = false;
  export let name: string | undefined = undefined;

  let className = '';
  export { className as class };

  $: percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
</script>

<div class="relative flex w-full touch-none select-none items-center h-6 {className}">
  {#if name}
    <input type="hidden" {name} {value} />
  {/if}

  <div class="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-muted border border-border">
    <div class="absolute h-full bg-accent transition-all" style="width: {percent}%;"></div>
  </div>

  <input
    type="range"
    bind:value
    {min}
    {max}
    {step}
    {disabled}
    class="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
  />

  <div
    class="pointer-events-none absolute block h-5 w-5 -translate-x-1/2 rounded-full border border-border bg-surface shadow-md ring-offset-surface transition-transform"
    style="left: {percent}%;"
  ></div>
</div>
