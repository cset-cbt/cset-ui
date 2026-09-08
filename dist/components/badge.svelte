<script lang="ts">
  export let variant: 'solid' | 'outline' | 'soft' | 'schematic' | 'pill' = 'soft';
  export let color: 'neutral' | 'accent' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple' = 'accent';
  export let size: 'sm' | 'md' = 'sm';
  export let hasDot: boolean = false;
  export let ping: boolean = false;

  let className = '';
  export { className as class };

  $: colorStyles = (() => {
    switch (color) {
      case 'emerald':
        return {
          solid: 'bg-emerald-500 text-white border-emerald-600',
          outline: 'border-emerald-500 text-emerald-500 bg-transparent',
          soft: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
          dot: 'bg-emerald-500'
        };
      case 'amber':
        return {
          solid: 'bg-amber-500 text-black border-amber-600 font-bold',
          outline: 'border-amber-500 text-amber-500 bg-transparent',
          soft: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
          dot: 'bg-amber-500'
        };
      case 'rose':
        return {
          solid: 'bg-rose-500 text-white border-rose-600',
          outline: 'border-rose-500 text-rose-500 bg-transparent',
          soft: 'bg-rose-500/15 text-rose-500 border-rose-500/30',
          dot: 'bg-rose-500'
        };
      case 'sky':
        return {
          solid: 'bg-sky-500 text-white border-sky-600',
          outline: 'border-sky-500 text-sky-500 bg-transparent',
          soft: 'bg-sky-500/15 text-sky-500 border-sky-500/30',
          dot: 'bg-sky-500'
        };
      case 'purple':
        return {
          solid: 'bg-purple-500 text-white border-purple-600',
          outline: 'border-purple-500 text-purple-500 bg-transparent',
          soft: 'bg-purple-500/15 text-purple-500 border-purple-500/30',
          dot: 'bg-purple-500'
        };
      case 'neutral':
        return {
          solid: 'bg-surface-muted text-ink border-border-strong',
          outline: 'border-border text-ink-muted bg-transparent',
          soft: 'bg-surface-muted/60 text-ink border-border',
          dot: 'bg-ink-muted'
        };
      case 'accent':
      default:
        return {
          solid: 'bg-accent text-white border-accent-solid',
          outline: 'border-accent text-accent bg-transparent',
          soft: 'bg-accent/15 text-accent border-accent/30',
          dot: 'bg-accent'
        };
    }
  })();

  $: variantClasses = (() => {
    switch (variant) {
      case 'solid':
        return `rounded-md border ${colorStyles.solid}`;
      case 'outline':
        return `rounded-md border ${colorStyles.outline}`;
      case 'schematic':
        return `corner-ticks rounded-sm border ${colorStyles.soft} font-bold tracking-wider`;
      case 'pill':
        return `rounded-full border ${colorStyles.soft}`;
      case 'soft':
      default:
        return `rounded-md border ${colorStyles.soft}`;
    }
  })();

  $: sizeClasses = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[0.68rem]';
</script>

<span
  class="inline-flex items-center gap-1.5 font-mono leading-none select-none transition-all {variantClasses} {sizeClasses} {className}"
>
  {#if hasDot}
    <span class="relative flex h-2 w-2 shrink-0">
      {#if ping}
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 {colorStyles.dot}"
        ></span>
      {/if}
      <span class="relative inline-flex rounded-full h-2 w-2 {colorStyles.dot}"></span>
    </span>
  {/if}
  <slot />
</span>
