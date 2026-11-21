---
'@xaroth.nl/design': patch
---

Modal and Dialog ignore the cancel and close events of a dialog nested in them, so Escape closes only the top one. Closing returns focus to the element that opened it. The dialog resets the text alignment, white space, weight, transform and letter spacing it would inherit from where it is mounted.
