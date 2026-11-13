# @xaroth.nl/design

## 0.9.0

### Minor Changes

- [#48](https://github.com/xaroth/design/pull/48)
  [`0050ce8`](https://github.com/xaroth/design/commit/0050ce810c189f74774d1cc966f18cbde5ebdf20) - Add `HoverCard`: a
  small card with a title, lines and optional body, shown at a point inside its positioned container and kept inside it.
  It flips to the side of the point that has room, in CSS only, for things without a DOM element of their own such as
  nodes on a canvas.

## 0.8.0

### Minor Changes

- [#44](https://github.com/xaroth/design/pull/44)
  [`f96767b`](https://github.com/xaroth/design/commit/f96767be509892903f7220e15d665f5b4f2b3e9e) - Add a pbt favicon:
  `favicon/pbt.svg`, a `favicon/pbt.ico` fallback (16, 32 and 48 px) and a 180 px touch icon `favicon/pbt-180.png`.

## 0.7.0

### Minor Changes

- [#41](https://github.com/xaroth/design/pull/41)
  [`1683a3e`](https://github.com/xaroth/design/commit/1683a3eb2e164a39aa7b709a894504a7cbb08895) - PageHead takes
  `compact`, a smaller title and tighter gaps for the top of a panel, and `titleFocusable`, which puts `tabindex="-1"`
  on the title so a script can move focus to it after a screen change. React also takes `titleRef` for the title
  element.

### Patch Changes

- [#40](https://github.com/xaroth/design/pull/40)
  [`02f084c`](https://github.com/xaroth/design/commit/02f084cb8bbe4954bed146ae7ca0eb6592f9c747) - The header folds its
  nav by its own width instead of the viewport's, so a header in a narrow region folds too. In a workspace the header
  spans the full width.

## 0.6.0

### Minor Changes

- [#34](https://github.com/xaroth/design/pull/34)
  [`827f960`](https://github.com/xaroth/design/commit/827f96044e943f4bea69ee240846945633b1b59c) - Add ChoiceCard: one
  option of a radio group drawn as a card, with a title, a short text and an optional image. Cards in a RadioGroup tile
  as a grid.

- [#36](https://github.com/xaroth/design/pull/36)
  [`b29cb8d`](https://github.com/xaroth/design/commit/b29cb8da4fda4a06c33bc1c896fc61ca6b50d34a) - Add Workspace: an app
  screen that fills the viewport with a header, a main region that takes the remaining space and a side panel. Only the
  panel scrolls. Below 720px of its own width the panel moves under the main region.

### Patch Changes

- [#37](https://github.com/xaroth/design/pull/37)
  [`f24392b`](https://github.com/xaroth/design/commit/f24392bf45838122401f22d34fe54b48a001223d) - Workspace: a single
  child of the main region fills it. EmptyState: content is centered when the state is taller than it. ChoiceCard: cards
  in a horizontal group keep the same gap between rows as between columns.

## 0.5.0

### Minor Changes

- [#30](https://github.com/xaroth/design/pull/30)
  [`3bb2f5b`](https://github.com/xaroth/design/commit/3bb2f5be3951db71faf8b2b88c05bd03b49a55ec) - Density utilities
  `x-density-comfortable`, `x-density-compact` and `x-density-dense` set the row spacing and text size of description
  lists in an area. The `pbt` theme defaults to compact; other themes are unchanged.

- [#31](https://github.com/xaroth/design/pull/31)
  [`9cb62ef`](https://github.com/xaroth/design/commit/9cb62ef10d47417d4ee0f19f63a1085b0c14d8b7) - Description list items
  take an optional `change` (`{ amount, effect: 'better' | 'worse', label? }`): the row gets a success or danger wash,
  the amount shows with an up or down triangle, and screen readers hear the effect after the amount.

- [#32](https://github.com/xaroth/design/pull/32)
  [`55da5cb`](https://github.com/xaroth/design/commit/55da5cbc17d90f52637775d29f6bceec2fda2ae4) -
  `DescriptionListGroups` and `DescriptionListGroup` put titled description lists in one area, stacked or in columns
  that follow the area's width (one column in a side panel, several on a wide screen). Description lists take `striped`
  to shade every other row. Density utilities also set the gap between groups.

- [#29](https://github.com/xaroth/design/pull/29)
  [`cb0473c`](https://github.com/xaroth/design/commit/cb0473ccc3615029c2b15859fadd3ca7a153c38c) - New `pbt` theme for
  pbt-web: neutral graphite with a muted stone accent, Onest throughout, square shapes and little ornament, tuned for
  dense panels of numbers. Load `themes/pbt.css` or use `data-x-theme="pbt"`.

## 0.4.0

### Minor Changes

- [#21](https://github.com/Xaroth/design/pull/21)
  [`11069b6`](https://github.com/Xaroth/design/commit/11069b61f39b95d55af2601db33d73940cff02e5) - Tooltip: add `left`
  and `right` placements. The bubble centers vertically on the trigger, flips once to the other side when it does not
  fit, stays 8px inside the viewport and keeps the arrow on the trigger's middle. Side placements ignore the horizontal
  alignment tokens (`--x-tooltip-left`, `--x-tooltip-shift`, `--x-tooltip-arrow-left`).

## 0.3.1

### Patch Changes

- [#16](https://github.com/Xaroth/design/pull/16)
  [`975b05f`](https://github.com/Xaroth/design/commit/975b05fec53d9d851cdce703a896d863c01798dd) - Tooltip: show the
  bubble in the top layer (Popover API) at fixed coordinates. Overflow containers no longer clip it or grow a scrollbar
  for it, it shows above modal dialogs, flips once when the requested side does not fit, and stays 8px inside the
  viewport. `open` tooltips keep the inline bubble. Browsers without popover support keep the CSS-only bubble. Adds
  `tooltipScript` and `installTooltips`; `tooltipEscapeScript` is deprecated.

## 0.3.0

### Minor Changes

- [#13](https://github.com/Xaroth/design/pull/13)
  [`d74de3d`](https://github.com/Xaroth/design/commit/d74de3d7e82ad8b71f5f6099feacfcaa3dcc25b1) - Add `Modal`, `Dialog`
  and `ConfirmDialog`, built on the native modal `<dialog>`. `Modal` is the centered surface with backdrop, Escape and
  backdrop dismissal, and scroll lock. `Dialog` adds a title, body, actions and a close button. `ConfirmDialog` is the
  "are you sure" preset with a danger tone and a pending state. React is controlled through `open` and `onClose`; Astro
  opens and closes through invoker commands (`modalCommand`) without client JS. Adds the `--x-color-overlay` token to
  both themes.

## 0.2.0

### Minor Changes

- [#7](https://github.com/Xaroth/design/pull/7)
  [`cda755f`](https://github.com/Xaroth/design/commit/cda755faa74c849129d1a37db52620da517e18b8) - New theme fonts. EVE
  Online uses Saira, Sofia Sans and Azeret Mono. Xaroth uses Alegreya SC, Alegreya, Alegreya Sans and Red Hat Mono.

### Patch Changes

- [#6](https://github.com/Xaroth/design/pull/6)
  [`62e4b41`](https://github.com/Xaroth/design/commit/62e4b41fb2902b8d5de367557810631699fa6b6c) - Prose and
  DescriptionList link colors only apply to plain links, so a Button, Tag or other part rendered as an `<a>` inside them
  keeps its own color.
