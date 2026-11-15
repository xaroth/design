import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Bar } from '../../react.ts'
import { expectSameHtml } from '../../../test/compare.ts'
import { Bar as AstroBar } from '../../astro.ts'

// Parts are named slots in Astro and ReactNode props in React; each case gives both forms.
const parts = {
  start: {
    html: '<nav aria-label="Build views"><a href="#tree" aria-current="page">Tree</a></nav>',
    react: () =>
      createElement(
        'nav',
        { 'aria-label': 'Build views' },
        createElement('a', { href: '#tree', 'aria-current': 'page' }, 'Tree'),
      ),
  },
  end: {
    html: '<input class="x-input" aria-label="Build name" value="Arrows">',
    react: () => createElement('input', { className: 'x-input', 'aria-label': 'Build name', defaultValue: 'Arrows' }),
  },
  notice: {
    html: 'Changing the ascendancy resets 6 points.',
    react: () => 'Changing the ascendancy resets 6 points.',
  },
}

type Part = keyof typeof parts

const cases: { name: string; parts: Part[]; props?: Record<string, unknown> }[] = [
  { name: 'start and end', parts: ['start', 'end'] },
  { name: 'start, end and notice', parts: ['start', 'end', 'notice'] },
  { name: 'start only', parts: ['start'] },
  { name: 'end only', parts: ['end'] },
  { name: 'notice only', parts: ['notice'] },
  { name: 'empty', parts: [] },
  { name: 'extra class and attrs', parts: ['start', 'end'], props: { class: 'build-bar', id: 'bar' } },
]

describe('Bar renders the same HTML in Astro and React', () => {
  for (const { name, parts: used, props = {} } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const slots = Object.fromEntries(used.map((p) => [p, parts[p].html]))
      const nodes = Object.fromEntries(used.map((p) => [p, parts[p].react()]))
      await expectSameHtml(AstroBar, { props, slots }, createElement(Bar, { ...rest, className, ...nodes } as never))
    })
  }
})
