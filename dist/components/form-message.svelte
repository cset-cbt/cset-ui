<script lang="ts">
  export let variant: 'success' | 'error' = 'error';
</script>

{#if variant === 'error'}
  <p class="text-sm text-danger" role="alert">
    <span aria-hidden="true">!</span>
    <slot />
  </p>
{:else}
  <p class="text-sm text-success inline-flex items-center gap-1.5">
    <svg class="h-3.5 w-3.5 stroke-current fill-none shrink-0" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <slot />
  </p>
{/if}
