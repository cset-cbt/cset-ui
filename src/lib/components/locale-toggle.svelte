<script lang="ts">
  export let value: 'vi' | 'en' = 'vi';
  export let onLocaleChange: ((locale: 'vi' | 'en') => void) | undefined = undefined;

  let className = '';
  export { className as class };

  function setLang(next: 'vi' | 'en') {
    if (value === next) return;
    value = next;
    onLocaleChange?.(next);
  }
</script>

<div
  class="locale-segmented {className}"
  role="group"
  aria-label="Chuyển đổi ngôn ngữ / Switch Language"
>
  <!-- Sliding active capsule background -->
  <span
    class="locale-segmented__slider"
    class:is-en={value === 'en'}
    aria-hidden="true"
  ></span>

  <button
    type="button"
    class="locale-segmented__btn"
    class:active={value === 'vi'}
    on:click={() => setLang('vi')}
    aria-pressed={value === 'vi'}
  >
    VI
  </button>
  <button
    type="button"
    class="locale-segmented__btn"
    class:active={value === 'en'}
    on:click={() => setLang('en')}
    aria-pressed={value === 'en'}
  >
    EN
  </button>
</div>

<style>
  .locale-segmented {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 1.5rem;
    padding: 2px;
    border-radius: 999px;
    border: 1px solid var(--ui-border-strong);
    background: var(--ui-surface-muted);
    user-select: none;
  }
  .locale-segmented__slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(50% - 2px);
    height: calc(100% - 4px);
    border-radius: 999px;
    background: var(--ui-accent-solid);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }
  .locale-segmented__slider.is-en {
    transform: translateX(100%);
  }
  .locale-segmented__btn {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.55rem;
    height: 100%;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--ui-ink-muted);
    background: transparent;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    padding: 0;
    transition: color 150ms ease, transform 100ms ease;
  }
  .locale-segmented__btn:active {
    transform: scale(0.92);
  }
  .locale-segmented__btn.active {
    color: #ffffff;
    font-weight: 700;
  }
  .locale-segmented__btn:not(.active):hover {
    color: var(--ui-ink);
  }
  @media (prefers-reduced-motion: reduce) {
    .locale-segmented__slider {
      transition: none;
    }
  }
</style>
