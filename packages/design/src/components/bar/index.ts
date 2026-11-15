import { bem } from '../../bem.ts'

// A bar under the header: navigation at the start, fields at the end, and a line for one short notice under it.
const bar = bem('x-bar')

export type BarOptions = {
  className?: string
}

export const barClass = ({ className }: BarOptions = {}): string => bar({}, className)

export const barClasses = {
  inner: bar.el('inner'),
  start: bar.el('start'),
  end: bar.el('end'),
  notice: bar.el('notice'),
} as const

// The live region is always rendered, so screen readers pick up a notice that appears or changes later.
export const barNoticeAttrs = { role: 'status' } as const
