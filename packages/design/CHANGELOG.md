# @xaroth.nl/design

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
