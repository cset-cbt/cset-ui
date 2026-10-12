# AGENTS.md - cset-ui (CSET Shared Design System & Component Library)

Strict operational directives for AI agents operating inside the `@cset/cset-ui` repository (`https://github.com/cset-cbt/cset-ui`).
---

## 1. Core Identity & Architectural Constraints

- **Repository Role**: The single source of truth for the CSET design system: Blueprint / Schematic aesthetic, UI primitives, tokens, and theme management across all CSET apps (`mycset`, `auth`, `cset-web`, `cset-ui-docs`).
- **Tech Stack**:
  - Runtime: Svelte 5 (Runes / Snippets / Modern syntax)
  - Primitives: `bits-ui` (headless accessible components)
  - Styling: Tailwind CSS v4 (`styles.css`, `@theme`, `@utility`)
  - Target: Packaging via `@sveltejs/package` into `./dist`
  - Typography: Self-hosted Geist Sans, Geist Mono, Geist Pixel
  - Package Manager: `bun` (strictly use `bun`, `bun run package`, `bun run check`)

---

## 2. Component Design & Contribution Guidelines

- **Blueprint / Schematic Aesthetic**:
  - Hairline borders (`border-[var(--ui-border)]`).
  - Corner-ticks (`.corner-ticks` - L-shaped digital PCB test markers).
  - Dot-grid matrices and subtle ambient glows.
- **Strictly NO EMOJIS (CRITICAL)**: NEVER use emojis (such as 📁, ⚡, 📝, ⚙️, 🏷️, 🚀, 🔴, 🟡, 🟢, etc.) in code, markup, buttons, tabs, empty states, or UI components under any circumstances. Emojis look amateurish and break professional developer tool aesthetics. Always use custom vector SVG icons or clean minimalist monospace typography.
- **Sizing & Spacing: Use `rem` / `em` Instead of Hardcoded `px`**:
  - Always prefer responsive `rem` units (or Tailwind spacing scales based on `rem`) over hardcoded pixel (`px`) values for font sizes, margins, paddings, line heights, and container dimensions.
  - The only allowed exceptions for `px` are 1px / 2px structural hairline borders (`border: 1px solid ...`), hair dividers, or micro-ticks.
- **Standard Hyphen/Dash Rule (NO EM DASH)**: NEVER use em dashes ("—") or en dashes ("–") in documentation, code, comments, copy, or commit messages. Always use the standard keyboard dash/hyphen ("-").
- **Accessibility & ARIA (WCAG 2.1 AA)**:
  - All interactive elements must support keyboard navigation (`Tab`, `Space`, `Enter`, arrows) and explicit ARIA labels.
- **Component Packaging Invariant**:
  - Whenever updating any component in `src/lib/`, agents **MUST** run `bun run package` to rebuild `./dist/` and keep `.d.ts` types synchronized.
---

## 3. Code Quality & Clean Architecture Standards

- **200-Line File Limit**: Strictly keep individual component files under 200 lines. Split composite widgets (e.g. `dialog`, `dropdown-menu`, `toast`) into sub-modules.
- **Kebab-Case Naming**: All component and styling files must use kebab-case (`theme-toggle.svelte`, `locale-toggle.svelte`).
- **Clean Types**: Export explicit TypeScript interfaces for all props and event payloads.

---

## 4. Verification & Pre-Commit Protocol

Before claiming any task is done, agents **MUST** execute and pass:
1. `bun run check` - Must produce **0 errors and 0 warnings**.
2. `bun run package` - Must build `./dist` cleanly without bundling errors.
---

## 5. Changelog & PR Delivery Workflow

For every new primitive, fix, or theme token change:
1. **Update Project Changelog**: Append to `./CHANGELOG.md` following Keep a Changelog format.
2. **Git Commit**: Commit with conventional commit convention (`feat:`, `fix:`, `refactor:`, `docs:`).
3. **Pull Request Protocol**:
   - Create a feature branch: `git checkout -b feat/<component-name>`.
   - Push to remote: `git push -u origin feat/<component-name>`.
   - Submit PR via `gh pr create` with component demo and API usage examples.
