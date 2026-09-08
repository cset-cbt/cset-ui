<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let page: number = 1;
  export let total: number = 0;
  export let pageSize: number = 10;
  export let siblingCount: number = 1;

  let className = '';
  export { className as class };

  const dispatch = createEventDispatcher<{ change: number }>();

  $: totalPages = Math.max(1, Math.ceil(total / pageSize));

  $: pages = (() => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...Array.from({ length: leftItemCount }, (_, i) => i + 1), '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [1, '...', ...rightRange];
    }

    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
    return [1, '...', ...middleRange, '...', totalPages];
  })();

  function setPage(p: number | string) {
    if (typeof p !== 'number') return;
    if (p < 1 || p > totalPages || p === page) return;
    page = p;
    dispatch('change', p);
  }
</script>

<nav aria-label="Pagination" class="flex items-center justify-between gap-4 font-mono text-xs select-none {className}">
  <div class="text-ink-muted">
    Trang <strong class="text-ink">{page}</strong> / {totalPages}
  </div>

  <div class="flex items-center gap-1">
    <!-- Prev button -->
    <button
      type="button"
      class="h-8 px-2.5 rounded-lg border border-border bg-surface hover:bg-surface-muted text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      disabled={page <= 1}
      on:click={() => setPage(page - 1)}
      aria-label="Trang trước"
    >
      &larr;
    </button>

    <!-- Page numbers -->
    {#each pages as p}
      {#if p === '...'}
        <span class="h-8 w-8 flex items-center justify-center text-ink-muted select-none">
          ...
        </span>
      {:else}
        <button
          type="button"
          class="h-8 w-8 rounded-lg flex items-center justify-center transition-colors {page === p
            ? 'bg-accent text-white font-bold shadow-xs'
            : 'border border-border bg-surface hover:bg-surface-muted text-ink'}"
          on:click={() => setPage(p)}
          aria-current={page === p ? 'page' : undefined}
        >
          {p}
        </button>
      {/if}
    {/each}

    <!-- Next button -->
    <button
      type="button"
      class="h-8 px-2.5 rounded-lg border border-border bg-surface hover:bg-surface-muted text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      disabled={page >= totalPages}
      on:click={() => setPage(page + 1)}
      aria-label="Trang sau"
    >
      &rarr;
    </button>
  </div>
</nav>
