import { bem } from '../../bem.ts'

export type PageHeadAlign = 'start' | 'center'

export type PageHeadLevel = 1 | 2

export type PageHeadOptions = {
  align?: PageHeadAlign
  /** Smaller title and gaps, for the top of a panel rather than a page. */
  compact?: boolean
  className?: string
}

const pageHead = bem('x-page-head', { defaults: { align: 'start' } })

export const pageHeadClass = ({ align = 'start', compact, className }: PageHeadOptions = {}): string =>
  pageHead({ align, compact }, className)

export const pageHeadClasses = {
  crumbs: pageHead.el('crumbs'),
  body: pageHead.el('body'),
  titles: pageHead.el('titles'),
  eyebrow: pageHead.el('eyebrow'),
  title: pageHead.el('title'),
  lead: pageHead.el('lead'),
  meta: pageHead.el('meta'),
  actions: pageHead.el('actions'),
} as const

export const pageHeadTag = (level: PageHeadLevel = 1) => `h${level}` as const

// Out of the tab order, but a script can move focus to the title after a screen change.
export const pageHeadTitleTabIndex = (focusable?: boolean) => (focusable ? -1 : undefined)
