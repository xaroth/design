import { bem } from '../../bem.ts'

export type ReplacementOptions = {
  /** Nothing replaces it: the lines are added to what it already has. */
  added?: boolean
  className?: string
}

const list = bem('x-replacement-list')
const replacement = bem('x-replacement')

export const replacementListClass = ({ className }: { className?: string } = {}): string => list({}, className)

export const replacementClass = ({ added, className }: ReplacementOptions = {}): string =>
  replacement({ added }, className)

export const replacementClasses = {
  head: replacement.el('head'),
  from: replacement.el('from'),
  arrow: replacement.el('arrow'),
  to: replacement.el('to'),
  gains: replacement.el('gains'),
  meta: replacement.el('meta'),
  lines: replacement.el('lines'),
} as const

// Spoken between the names in place of the arrow. Spaces so the words do not run into the names.
export const replacementToLabel = (label = 'becomes'): string => ` ${label} `
