<script lang="ts">
  export let label: string;
  export let id: string = `field-${Math.random().toString(36).slice(2, 9)}`;
  export let multiline = false;

  $: ({ value, ...textareaRest } = $$restProps);
</script>

<label class="field" for={id}>
  <span class="mono-label text-xs text-ink-muted">{label}</span>
  {#if multiline}
    <textarea {id} {...textareaRest}>{value ?? ''}</textarea>
  {:else}
    <input {id} {...$$restProps} />
  {/if}
</label>
