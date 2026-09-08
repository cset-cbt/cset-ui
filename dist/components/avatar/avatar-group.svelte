<script lang="ts">
  export const max: number = 4;
  export let overflowCount: number = 0;

  let className = '';
  export { className as class };
</script>

<div class="flex items-center -space-x-2.5 overflow-hidden p-0.5 {className}">
  <slot />

  {#if overflowCount > 0}
    <div
      class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-surface-muted font-mono text-[0.65rem] font-bold text-ink shadow-xs select-none"
    >
      +{overflowCount}
    </div>
  {/if}
</div>
