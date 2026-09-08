<script lang="ts">
  import { onMount } from 'svelte';
  import { scale, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { dismissToast, type ToastItem } from './toast-store';

  export let toast: ToastItem;

  let progress = 100;
  let interval: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    if (toast.duration && toast.duration > 0) {
      const step = 20;
      const totalSteps = toast.duration / step;
      const decrement = 100 / totalSteps;

      interval = setInterval(() => {
        progress = Math.max(0, progress - decrement);
        if (progress <= 0 && interval) {
          clearInterval(interval);
        }
      }, step);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  });
</script>

<div
  class="relative flex w-full max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-surface/98 p-3.5 shadow-2xl backdrop-blur-xl transition-all"
  transition:fly={{ y: 16, duration: 200, easing: cubicOut }}
  role="status"
  aria-live="polite"
>
  <div class="flex items-start justify-between gap-3">
    <!-- Status Icon -->
    <div class="mt-0.5 shrink-0">
      {#if toast.type === 'success'}
        <div class="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
          <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      {:else if toast.type === 'error'}
        <div class="grid h-5 w-5 place-items-center rounded-full bg-rose-500/15 text-rose-500">
          <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      {:else if toast.type === 'warning'}
        <div class="grid h-5 w-5 place-items-center rounded-full bg-amber-500/15 text-amber-500">
          <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      {:else if toast.type === 'loading'}
        <div class="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
          <svg class="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      {:else}
        <div class="grid h-5 w-5 place-items-center rounded-full bg-sky-500/15 text-sky-500">
          <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
      {/if}
    </div>

    <!-- Content -->
    <div class="flex-1 space-y-1">
      <div class="font-sans text-xs font-semibold text-ink leading-tight">
        {toast.title}
      </div>
      {#if toast.description}
        <div class="font-sans text-[0.72rem] text-ink-muted leading-relaxed">
          {toast.description}
        </div>
      {/if}
      {#if toast.action}
        <div class="pt-1.5">
          <button
            type="button"
            class="rounded bg-accent/15 px-2.5 py-1 font-mono text-[0.68rem] font-bold text-accent hover:bg-accent/25 transition-colors"
            on:click={() => {
              toast.action?.onClick();
              dismissToast(toast.id);
            }}
          >
            {toast.action.label}
          </button>
        </div>
      {/if}
    </div>

    <!-- Close Button -->
    <button
      type="button"
      class="grid h-5 w-5 place-items-center rounded text-ink-muted hover:bg-surface-muted hover:text-ink text-sm font-bold transition-colors"
      on:click={() => dismissToast(toast.id)}
      aria-label="Đóng thông báo"
    >
      &times;
    </button>
  </div>

  <!-- Countdown Progress Bar -->
  {#if toast.duration && toast.duration > 0}
    <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-border/20">
      <div
        class="h-full bg-accent/60 transition-all duration-75"
        style="width: {progress}%;"
      ></div>
    </div>
  {/if}
</div>
