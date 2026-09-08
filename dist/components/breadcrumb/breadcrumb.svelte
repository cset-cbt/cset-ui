<script module lang="ts">
  export interface BreadcrumbItem {
    href?: string;
    label: string;
  }
</script>

<script lang="ts">
  export let items: BreadcrumbItem[] = [];

  let className = '';
  export { className as class };
</script>

<nav aria-label="Breadcrumb" class="flex items-center font-mono text-xs text-ink-muted {className}">
  <ol class="flex flex-wrap items-center gap-1.5">
    {#each items as item, i}
      {@const isLast = i === items.length - 1}
      <li class="inline-flex items-center gap-1.5">
        {#if item.href && !isLast}
          <a
            href={item.href}
            class="hover:text-ink transition-colors hover:underline underline-offset-4"
          >
            {item.label}
          </a>
        {:else}
          <span class={isLast ? 'font-bold text-ink select-none' : ''} aria-current={isLast ? 'page' : undefined}>
            {item.label}
          </span>
        {/if}

        {#if !isLast}
          <span class="text-ink-muted/50 select-none" aria-hidden="true">
            <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
