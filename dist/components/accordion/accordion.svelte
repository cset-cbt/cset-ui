<script module lang="ts">
  export interface AccordionItem {
    value: string;
    title: string;
    content?: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import { Accordion } from 'bits-ui';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let items: AccordionItem[] = [];
  export let value: string = '';

  let className = '';
  export { className as class };
</script>

<Accordion.Root
  type="single"
  bind:value
  class="w-full divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden shadow-xs {className}"
>
  {#each items as item (item.value)}
    <Accordion.Item value={item.value} disabled={item.disabled} class="group">
      <Accordion.Header>
        <Accordion.Trigger
          class="flex w-full items-center justify-between p-4 text-left font-sans text-xs font-semibold text-ink hover:text-accent transition-colors select-none cursor-pointer outline-none focus-visible:bg-surface-muted/50"
        >
          <span>{item.title}</span>
          <span class="ml-2 shrink-0 text-ink-muted transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content class="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div class="px-4 pb-4 font-sans text-xs text-ink-muted leading-relaxed">
          {#if item.content}
            <p>{item.content}</p>
          {/if}
          <slot name="content" {item} />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
