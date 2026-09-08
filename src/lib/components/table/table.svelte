<script lang="ts">
  export let striped: boolean = false;
  export let hoverable: boolean = true;

  let className = '';
  export { className as class };
</script>

<div class="w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-xs {className}">
  <table class="w-full text-left font-sans text-xs border-collapse {striped ? '[&_tbody_tr:nth-child(even)]:bg-surface-muted/30' : ''} {hoverable ? '[&_tbody_tr]:hover:bg-surface-muted/40 [&_tbody_tr]:transition-colors' : ''}">
    <slot />
  </table>
</div>
