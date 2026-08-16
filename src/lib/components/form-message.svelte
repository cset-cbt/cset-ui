<script lang="ts">
  export let variant: 'success' | 'error' = 'error';
</script>

{#if variant === 'error'}
  <p class="text-sm text-danger" role="alert">
    <span aria-hidden="true">!</span>
    <slot />
  </p>
{:else}
  <p class="text-sm text-success">
    <span aria-hidden="true">✓</span>
    <slot />
  </p>
{/if}
