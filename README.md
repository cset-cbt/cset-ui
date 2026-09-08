# cset-ui

> Engineering-grade Blueprint / Schematic UI library for the CSET ecosystem, built natively on Svelte 5, Tailwind CSS v4, and Bits UI.

`cset-ui` provides a unified, accessible, and high-performance component foundation for CSET web platforms (`mycset`, `cset-auth`, `cset-ui-docs`). It encodes the club's signature **Blueprint Schematic** design identity: self-hosted Geist typography, technical corner-ticks, monospaced eyebrow tags, hairline borders, and an accessible dual-theme system.

---

## Installation

Install directly from the GitHub repository pinned to the current stable release:

```bash
pnpm add github:cset-cbt/cset-ui#v0.4.0
```

### Peer Dependencies
- `svelte`: `^5.0.0`
- `@sveltejs/kit`: `^2.0.0`
- `tailwindcss`: `^4.0.0` (with `@tailwindcss/vite`)

---

## Configuration

### 1. Stylesheet Integration
In your application's global stylesheet (`src/app.css`):

```css
@import "tailwindcss";
@import "cset-ui/styles.css";
```

`cset-ui/styles.css` declares its own `@source` directive pointing directly at the compiled component files. Tailwind CSS v4 automatically resolves classes across the `@import` boundary without manual `@source` declarations in your app. Self-hosted Geist fonts are bundled automatically via Vite asset resolution.

### 2. Anti-Flash Theme Setup
Add this script inside the `<head>` of `src/app.html` to eliminate Flash of Unstyled Content (FOUC):

```html
<script>
  try {
    var t = localStorage.getItem('cset-theme');
    document.documentElement.dataset.theme =
      t === 'light' || t === 'dark'
        ? t
        : matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
  } catch (e) {}
</script>
```

---

## Component Catalog

Import primitives directly from the package root:

```svelte
<script lang="ts">
  import {
    Button,
    Card,
    InputField,
    Select,
    Switch,
    DatePicker,
    Dialog,
    Sheet,
    toast,
    Badge,
    Avatar,
    Tabs,
    Pagination,
    Table,
    Accordion,
    Breadcrumb,
    Skeleton,
    PageHeader,
    ThemeToggle,
    CircuitDivider
  } from 'cset-ui';
</script>
```

### 1. Overlays & Feedback
- **`Button`**: Tactile interactive button with `primary`, `secondary`, `danger` variants, automatic `<a>` link mode, and loading state.
- **`Toast` (Sonner)**: Stacked toast notifications via `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`.
- **`Dialog` (Modal)**: Accessible modal dialog with backdrop blur, focus trapping, and header/footer snippets.
- **`Sheet` (Drawer)**: Slide-out panel supporting `left`, `right`, `top`, `bottom` orientations.

### 2. Forms & Controls
- **`InputField`**: Monospace label, error text slot, and technical corner accents.
- **`Select`**: Custom dropdown with keyboard accessibility and category color swatches.
- **`DatePicker`**: Calendar popover selector with ISO 8601 string value binding.
- **`Switch`**: Boolean toggle switch with smooth physical slide.

### 3. Data Display & Navigation
- **`Card`**: Signature Blueprint container with technical corner-ticks.
- **`Badge`**: Status and category tags with semantic variant colors.
- **`Avatar` & `AvatarGroup`**: User portraits with automatic monogram initials fallback.
- **`Tabs`**: Tabbed view switcher with sliding active indicator.
- **`Pagination`**: Directional and numeric page navigation.
- **`Table`**: Striped data table with hoverable rows and hairline dividers.
- **`Accordion`**: Collapsible FAQ and disclosure panels.
- **`Breadcrumb`**: Hierarchical route trail with chevron separators.
- **`Skeleton`**: Shimmering placeholder box preventing layout shifts.
- **`PageHeader`**: Consistent section header with eyebrow badge.

### 4. Utilities
- **`ThemeToggle`**: Light/Dark theme switcher with smooth luminescence transition.
- **`CircuitDivider`**: Schematic circuit-trace decorative divider.
- **`KeyboardIllustration`**: Blueprint keyboard visual component.

---

## Example Usage

```svelte
<script lang="ts">
  import { Card, PageHeader, InputField, Select, Button, toast } from 'cset-ui';

  let email = $state('');
  let role = $state('developer');

  function handleSave() {
    toast.success('Settings synchronized');
  }
</script>

<Card class="p-6">
  <PageHeader
    eyebrow="SETTINGS"
    title="Member Access"
    description="Configure identity federation and workspace roles."
  />

  <form onsubmit={handleSave} class="space-y-4 mt-6">
    <InputField
      label="EMAIL ADDRESS"
      name="email"
      type="email"
      bind:value={email}
      required
    />

    <Select
      label="SYSTEM ROLE"
      items={[
        { value: 'admin', label: 'Administrator' },
        { value: 'developer', label: 'Developer' }
      ]}
      bind:value={role}
    />

    <Button type="submit" size="sm">Save Configuration</Button>
  </form>
</Card>
```

---

## Development

```bash
pnpm install
pnpm package  # build dist and copy styles
pnpm check    # run svelte-check diagnostics
```

---

## Documentation & LLM Endpoints

- **Live Documentation**: [cset-ui-docs](https://cset-ui-docs.cset-software.workers.dev)
- **Lightweight Index**: [`/llms.txt`](https://cset-ui-docs.cset-software.workers.dev/llms.txt)
- **Complete API Reference**: [`/llms-full.txt`](https://cset-ui-docs.cset-software.workers.dev/llms-full.txt)
