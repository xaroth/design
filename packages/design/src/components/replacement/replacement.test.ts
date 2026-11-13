import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { Replacement, ReplacementList } from '../../react.ts'
import { expectSameHtml } from '../../../test/compare.ts'
import { Replacement as AstroReplacement, ReplacementList as AstroReplacementList } from '../../astro.ts'

const tag = (text: string): [string, ReactNode] => [`<span>${text}</span>`, createElement('span', null, text)]

// Astro takes the slots as HTML, React the same content as ReactNode props.
const cases: { name: string; props: Record<string, unknown>; slots?: Record<string, [string, ReactNode]> }[] = [
  { name: 'replaced', props: { from: 'Heart of Oak', to: 'Ritual of Might', lines: ['+10% to Strength'] } },
  { name: 'added', props: { from: 'Strength', lines: ['+2 to Strength'] } },
  { name: 'added, own label', props: { from: 'Strength', gainsLabel: 'adds' } },
  { name: 'empty to is added', props: { from: 'Strength', to: '' } },
  { name: 'own spoken label', props: { from: 'Heart of Oak', to: 'Ritual of Might', toLabel: 'turns into' } },
  {
    name: 'markup in from, to and meta',
    props: {},
    slots: { from: tag('Heart of Oak'), to: tag('Ritual of Might'), meta: tag('Allocated') },
  },
  { name: 'false meta is absent', props: { from: 'Strength', to: 'Dexterity' }, slots: { meta: ['', false] } },
  { name: 'null to slot is added', props: { from: 'Strength' }, slots: { to: ['  ', null] } },
  { name: 'extra class and attrs', props: { from: 'A', to: 'B', class: 'r', id: 'node-1', 'data-node': '1' } },
]

describe('Replacement renders the same HTML in Astro and React', () => {
  for (const { name, props, slots = {} } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const reactProps: Record<string, unknown> = { ...rest, className }
      const astroSlots: Record<string, string> = {}
      for (const [slot, [html, node]] of Object.entries(slots)) {
        astroSlots[slot] = html
        reactProps[slot] = node
      }
      await expectSameHtml(
        AstroReplacement,
        { props, slots: astroSlots },
        createElement(Replacement, reactProps as never),
      )
    })
  }
})

describe('ReplacementList renders the same HTML in Astro and React', () => {
  it('with a name and class', async () => {
    await expectSameHtml(
      AstroReplacementList,
      { props: { 'aria-label': 'Nodes in radius', class: 'l' } },
      createElement(ReplacementList, { 'aria-label': 'Nodes in radius', className: 'l' }),
    )
  })
})
