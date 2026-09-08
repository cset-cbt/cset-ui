<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let value: string = ''; // YYYY-MM-DD
  export let label: string = '';
  export let name: string = '';
  export let placeholder: string = 'Chọn ngày...';
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher<{ change: string }>();

  let isOpen = false;
  let containerRef: HTMLDivElement | null = null;

  $: parsedDate = value ? new Date(`${value}T00:00:00`) : new Date();
  let viewYear = new Date().getFullYear();
  let viewMonth = new Date().getMonth() + 1; // 1-12

  $: {
    if (value) {
      const d = new Date(`${value}T00:00:00`);
      if (!isNaN(d.getTime())) {
        viewYear = d.getFullYear();
        viewMonth = d.getMonth() + 1;
      }
    }
  }

  $: firstDayIndex = (new Date(viewYear, viewMonth - 1, 1).getDay() + 6) % 7;
  $: daysInMonth = new Date(viewYear, viewMonth, 0).getDate();

  const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  function selectDate(dayNum: number) {
    const mm = String(viewMonth).padStart(2, '0');
    const dd = String(dayNum).padStart(2, '0');
    value = `${viewYear}-${mm}-${dd}`;
    isOpen = false;
    dispatch('change', value);
  }

  function prevMonth() {
    viewMonth--;
    if (viewMonth < 1) {
      viewMonth = 12;
      viewYear--;
    }
  }

  function nextMonth() {
    viewMonth++;
    if (viewMonth > 12) {
      viewMonth = 1;
      viewYear++;
    }
  }

  function setToday() {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    value = `${now.getFullYear()}-${mm}-${dd}`;
    isOpen = false;
    dispatch('change', value);
  }

  onMount(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef && !containerRef.contains(e.target as Node)) {
        isOpen = false;
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="flex flex-col relative w-full" bind:this={containerRef}>
  {#if label}
    <span class="mono-label text-xs text-ink-muted mb-1.5 block select-none">
      {label}
    </span>
  {/if}

  {#if name}
    <input type="hidden" {name} {value} />
  {/if}

  <!-- Trigger Box matching InputField -->
  <button
    type="button"
    class="h-[48.375px] w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-xs font-mono text-ink flex items-center justify-between cursor-pointer hover:border-accent/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all select-none shadow-xs disabled:opacity-50"
    on:click={() => !disabled && (isOpen = !isOpen)}
    {disabled}
  >
    <span class={value ? 'text-ink font-medium' : 'text-ink-muted/70'}>
      {value ? `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}` : placeholder}
    </span>
    <svg class="h-3.5 w-3.5 text-ink-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  </button>

  <!-- Floating Calendar Popover -->
  {#if isOpen}
    <div
      class="absolute left-0 top-full mt-1.5 z-50 w-72 rounded-2xl border border-border bg-surface/98 p-3.5 shadow-2xl backdrop-blur-2xl ring-1 ring-border/20"
      transition:scale={{ start: 0.95, duration: 160, opacity: 0, easing: cubicOut }}
    >
      <!-- Month Navigation Header -->
      <div class="flex items-center justify-between border-b border-border pb-2.5 mb-2 font-mono text-xs font-bold text-ink">
        <button type="button" class="h-6 w-6 rounded hover:bg-surface-muted grid place-items-center text-ink-muted hover:text-ink transition-colors" on:click={prevMonth}>
          &larr;
        </button>
        <span>Tháng {viewMonth}, {viewYear}</span>
        <button type="button" class="h-6 w-6 rounded hover:bg-surface-muted grid place-items-center text-ink-muted hover:text-ink transition-colors" on:click={nextMonth}>
          &rarr;
        </button>
      </div>

      <!-- Days Header -->
      <div class="grid grid-cols-7 text-center font-mono text-[0.62rem] text-ink-muted mb-1 font-bold">
        {#each DAYS as d}
          <div class="py-1">{d}</div>
        {/each}
      </div>

      <!-- Days Matrix Grid -->
      <div class="grid grid-cols-7 gap-1 text-center font-mono text-xs">
        {#each Array(firstDayIndex) as _}
          <div class="h-8"></div>
        {/each}

        {#each Array(daysInMonth) as _, i}
          {@const dayNum = i + 1}
          {@const isSelected = value === `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`}
          <button
            type="button"
            class="h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer {isSelected
              ? 'bg-accent text-white font-bold shadow-xs'
              : 'text-ink hover:bg-surface-muted'}"
            on:click={() => selectDate(dayNum)}
          >
            {dayNum}
          </button>
        {/each}
      </div>

      <!-- Footer Quick Today -->
      <div class="pt-2.5 mt-2 border-t border-border flex items-center justify-between text-[0.68rem] font-mono">
        <button type="button" class="text-accent hover:underline" on:click={setToday}>
          Hôm nay
        </button>
        <button type="button" class="text-ink-muted hover:text-ink" on:click={() => (isOpen = false)}>
          Đóng
        </button>
      </div>
    </div>
  {/if}
</div>
