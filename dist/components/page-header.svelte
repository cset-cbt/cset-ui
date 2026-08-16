<script lang="ts">
  export let eyebrow: string | undefined = undefined;
  export let title: string;
</script>

<header>
  {#if eyebrow}
    <p class="mono-label mb-1 text-xs text-accent">{eyebrow}</p>
  {/if}
  <h1 class="text-2xl font-bold text-ink">{title}</h1>
  {#if $$slots.default}
    <p class="mt-2 text-sm text-ink-muted"><slot /></p>
  {/if}
</header>
