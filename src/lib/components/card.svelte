<script lang="ts">
  let className = '';
  export { className as class };
</script>

<div class="card-surface corner-ticks rounded-sm border border-border bg-surface p-6 {className}">
  <slot />
</div>

<style>
  .card-surface {
    box-shadow: 0 12px 32px -16px rgba(3, 11, 68, 0.25);
  }
  :global([data-theme='dark']) .card-surface {
    box-shadow: none;
  }
</style>
