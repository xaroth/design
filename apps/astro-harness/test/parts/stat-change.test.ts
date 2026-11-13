import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { StatChange, StatChangeList } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { StatChange as AstroStatChange, StatChangeList as AstroStatChangeList } from '@xaroth.nl/design/astro'

// Astro takes the slots as HTML, React the same content as ReactNode props.
const cases: { name: string; props: Record<string, unknown>; slots?: Record<string, [string, ReactNode]> }[] = [
  { name: 'better', props: { name: 'Life', from: '1,140', to: '1,180', effect: 'better' } },
  { name: 'worse', props: { name: 'Mana Cost', from: '6', to: '8', effect: 'worse' } },
  { name: 'neutral by default', props: { name: 'Strength', from: '42', to: '42' } },
  {
    name: 'neutral with a label',
    props: { name: 'Radius', from: '10', to: '12', effect: 'neutral', label: 'no effect' },
  },
  { name: 'own label', props: { name: 'Life', from: '1', to: '2', effect: 'better', label: 'gain' } },
  { name: 'number values', props: { name: 'Level', from: 1, to: 2, effect: 'better' } },
  {
    name: 'slots with markup',
    props: { effect: 'worse' },
    slots: {
      name: ['<em>Evasion</em>', createElement('em', null, 'Evasion')],
      from: ['<b>312</b>', createElement('b', null, '312')],
      to: ['<b>288</b>', createElement('b', null, '288')],
    },
  },
  { name: 'extra class and attrs', props: { name: 'A', from: '1', to: '2', class: 'row', 'data-stat': 'life' } },
]

describe('StatChange renders the same HTML in Astro and React', () => {
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
        AstroStatChange,
        { props, slots: astroSlots },
        createElement(StatChange, reactProps as never),
      )
    })
  }
})

describe('StatChangeList renders the same HTML in Astro and React', () => {
  it('with a class and label', async () => {
    await expectSameHtml(
      AstroStatChangeList,
      { props: { class: 'changes', 'aria-label': 'Changes' } },
      createElement(StatChangeList, { className: 'changes', 'aria-label': 'Changes' }),
    )
  })
})
