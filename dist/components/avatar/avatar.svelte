<script lang="ts">
  export let src: string | null | undefined = undefined;
  export let name: string = '';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let status: 'online' | 'busy' | 'away' | 'offline' | undefined = undefined;

  let className = '';
  export { className as class };

  let imageFailed = false;

  $: initials = (() => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  })();

  $: sizeStyles = (() => {
    switch (size) {
      case 'xs':
        return { box: 'h-6 w-6 text-[0.6rem]', dot: 'h-1.5 w-1.5 ring-1' };
      case 'sm':
        return { box: 'h-8 w-8 text-xs', dot: 'h-2 w-2 ring-1.5' };
      case 'lg':
        return { box: 'h-12 w-12 text-sm', dot: 'h-3 w-3 ring-2' };
      case 'xl':
        return { box: 'h-16 w-16 text-base font-bold', dot: 'h-3.5 w-3.5 ring-2' };
      case 'md':
      default:
        return { box: 'h-10 w-10 text-xs font-semibold', dot: 'h-2.5 w-2.5 ring-2' };
    }
  })();

  $: statusBg = (() => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500';
      case 'busy':
        return 'bg-rose-500';
      case 'away':
        return 'bg-amber-500';
      case 'offline':
      default:
        return 'bg-zinc-500';
    }
  })();
</script>

<div class="relative inline-flex shrink-0 select-none {className}">
  <div
    class="flex items-center justify-center overflow-hidden rounded-full border border-border bg-surface-muted/80 font-mono text-ink shadow-xs {sizeStyles.box}"
  >
    {#if src && !imageFailed}
      <img
        {src}
        alt={name || 'Avatar'}
        class="h-full w-full object-cover"
        on:error={() => (imageFailed = true)}
      />
    {:else}
      <span>{initials}</span>
    {/if}
  </div>

  {#if status}
    <span
      class="absolute bottom-0 right-0 rounded-full ring-surface {statusBg} {sizeStyles.dot}"
      aria-label="Trạng thái: {status}"
    ></span>
  {/if}
</div>
