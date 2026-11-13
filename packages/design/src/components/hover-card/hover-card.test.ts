import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { HoverCard } from '../../react.ts'
import { expectSameHtml } from '../../../test/compare.ts'
import { HoverCard as AstroHoverCard } from '../../astro.ts'

// Astro takes the title slot as HTML, React the same content as a ReactNode prop.
const cases: { name: string; props: Record<string, unknown>; body?: string; title?: [string, ReactNode] }[] = [
  { name: 'title only', props: { x: 40, y: 24, title: 'Iron Reflexes' } },
  {
    name: 'title and lines',
    props: { x: 0, y: 0, title: 'Life', lines: ['+10 to maximum Life', '5% increased maximum Life'] },
  },
  { name: 'lines only', props: { x: 12.5, y: 300, lines: ['+10 to Strength'] } },
  { name: 'empty lines', props: { x: 1, y: 2, title: 'Small', lines: [] } },
  { name: 'body after lines', props: { x: 5, y: 6, title: 'Path', lines: ['+10 to Dexterity'] }, body: 'Two points.' },
  {
    name: 'title slot with markup',
    props: { x: 5, y: 6 },
    title: ['<em>Keystone</em>', createElement('em', null, 'Keystone')],
  },
  { name: 'non-finite point', props: { x: Number.NaN, y: Number.POSITIVE_INFINITY, title: 'Origin' } },
  { name: 'negative point', props: { x: -20, y: -4, title: 'Outside' } },
  {
    name: 'extra class and attrs',
    props: { x: 1, y: 1, title: 'A', class: 'tree-card', id: 'card', 'data-node': '7' },
  },
]

describe('HoverCard renders the same HTML in Astro and React', () => {
  for (const { name, props, body, title } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const slots: Record<string, string> = {}
      const reactProps: Record<string, unknown> = { ...rest, className }
      if (body) {
        slots.default = body
      }
      if (title) {
        slots.title = title[0]
        reactProps.title = title[1]
      }
      await expectSameHtml(AstroHoverCard, { props, slots }, createElement(HoverCard, reactProps as never, body))
    })
  }
})
