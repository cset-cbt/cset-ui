<script module lang="ts">
  export interface CommandItem {
    id: string;
    label: string;
    shortcut?: string;
    onSelect: () => void;
  }

  export interface CommandGroup {
    title: string;
    items: CommandItem[];
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let open: boolean = false;
  export let placeholder: string = 'Nhập lệnh hoặc tìm kiếm...';
  export let groups: CommandGroup[] = [];

  let query = '';
  let inputEl: HTMLInputElement | null = null;

  $: filteredGroups = groups
    .map((g) => ({
      title: g.title,
      items: g.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase().trim()))
    }))
    .filter((g) => g.items.length > 0);

  function handleSelect(item: CommandItem) {
    open = false;
    query = '';
    item.onSelect();
  }

  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open = !open;
        if (open) setTimeout(() => inputEl?.focus(), 50);
      } else if (e.key === 'Escape' && open) {
        open = false;
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-sm"
    transition:fade={{ duration: 150 }}
    on:click={(e) => e.target === e.currentTarget && (open = false)}
    on:keydown={(e) => e.key === 'Escape' && (open = false)}
    role="dialog"
    aria-modal="true"
    aria-label="Command Palette"
    tabindex="-1"
  >
    <div
      class="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface/98 p-2 shadow-2xl backdrop-blur-2xl ring-1 ring-border/20"
      transition:scale={{ start: 0.96, duration: 180, opacity: 0, easing: cubicOut }}
    >
      <!-- Search Input Bar -->
      <div class="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
        <svg class="h-4 w-4 text-ink-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          bind:this={inputEl}
          type="text"
          bind:value={query}
          {placeholder}
          class="flex-1 bg-transparent text-xs font-mono text-ink placeholder:text-ink-muted/70 focus:outline-none"
        />
        <kbd class="rounded border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[0.6rem] text-ink-muted">
          ESC
        </kbd>
      </div>

      <!-- Results Groups -->
      <div class="max-h-80 overflow-y-auto p-1 space-y-3">
        {#each filteredGroups as group}
          <div class="space-y-1">
            <span class="px-2 font-mono text-[0.62rem] uppercase tracking-wider text-ink-muted">
              {group.title}
            </span>
            <div class="space-y-0.5">
              {#each group.items as item}
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left font-mono text-xs text-ink hover:bg-surface-muted hover:text-accent transition-colors"
                  on:click={() => handleSelect(item)}
                >
                  <span>{item.label}</span>
                  {#if item.shortcut}
                    <kbd class="rounded border border-border bg-surface px-1.5 py-0.5 text-[0.6rem] text-ink-muted">
                      {item.shortcut}
                    </kbd>
                  {/if}
                </button>
              {/each}
            </div>
          </div>
        {/each}

        {#if filteredGroups.length === 0}
          <div class="py-8 text-center font-mono text-xs text-ink-muted">
            Không tìm thấy lệnh hoặc kết quả phù hợp.
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
