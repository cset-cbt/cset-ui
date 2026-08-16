<script lang="ts">
  const cols = 10;
  const rows = 4;
  const key = 18;
  const gap = 6;
  const step = key + gap;
  const width = cols * step - gap;
  const keysHeight = rows * step - gap;
  const height = keysHeight + gap + key;

  const keys = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({ x: c * step, y: r * step }))
  ).flat();
</script>

<svg
  class="keyboard-illustration"
  viewBox="0 0 {width} {height}"
  width={width}
  height={height}
  aria-hidden="true"
>
  {#each keys as k (k.x + ',' + k.y)}
    <rect x={k.x} y={k.y} width={key} height={key} rx="3" />
  {/each}
  <rect x="0" y={keysHeight + gap} width={width} height={key} rx="3" />
</svg>

<style>
  .keyboard-illustration rect {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
  }
</style>
