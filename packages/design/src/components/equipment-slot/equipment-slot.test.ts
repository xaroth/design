import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { EquipmentSlot, EquipmentSlots } from '../../react.ts'
import { expectSameHtml } from '../../../test/compare.ts'
import { EquipmentSlot as AstroEquipmentSlot, EquipmentSlots as AstroEquipmentSlots } from '../../astro.ts'

const button = (label: string): [string, ReactNode] => [
  `<button type="button">${label}</button>`,
  createElement('button', { type: 'button' }, label),
]

// Astro takes the slots as HTML, React the same content as ReactNode props; `default` is the children.
const cases: { name: string; props: Record<string, unknown>; slots?: Record<string, [string, ReactNode]> }[] = [
  { name: 'empty', props: { label: 'Helmet' } },
  { name: 'empty with actions', props: { label: 'Ring 2' }, slots: { actions: button('Paste item') } },
  { name: 'own empty label', props: { label: 'Belt', emptyLabel: 'Nothing equipped' } },
  {
    name: 'empty label with markup',
    props: { label: 'Belt' },
    slots: { emptyLabel: ['<em>None</em>', createElement('em', null, 'None')] },
  },
  {
    name: 'filled, current, heading level',
    props: { label: 'Gloves', current: true, headingLevel: 2 },
    slots: { default: ['<p>Doom Knuckle</p>', createElement('p', null, 'Doom Knuckle')], actions: button('Remove') },
  },
  {
    name: 'label with markup',
    props: {},
    slots: {
      label: ['<span>Weapon</span>', createElement('span', null, 'Weapon')],
      default: ['<p>Axe</p>', createElement('p', null, 'Axe')],
    },
  },
  {
    name: 'link to choose a filled slot, current',
    props: { label: 'Gloves', href: '#gloves', current: true },
    slots: { default: ['<span>Doom Knuckle</span>', createElement('span', null, 'Doom Knuckle')] },
  },
  { name: 'link to choose an empty slot', props: { label: 'Ring 2', href: '#ring-2' } },
  {
    name: 'link with an empty label slot',
    props: { label: 'Ring 2', href: '#ring-2' },
    slots: { emptyLabel: ['<em>None</em>', createElement('em', null, 'None')] },
  },
  { name: 'false child is empty', props: { label: 'Ring 2' }, slots: { default: ['', false] } },
  { name: 'whitespace child is empty', props: { label: 'Ring 2', href: '#r' }, slots: { default: ['  ', null] } },
  { name: 'extra class and attrs', props: { label: 'Amulet', class: 'slot', id: 'amulet', 'data-slot': 'Amulet' } },
]

describe('EquipmentSlot renders the same HTML in Astro and React', () => {
  for (const { name, props, slots = {} } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const reactProps: Record<string, unknown> = { ...rest, className }
      const astroSlots: Record<string, string> = {}
      for (const [slot, [html, node]] of Object.entries(slots)) {
        astroSlots[slot] = html
        if (slot !== 'default') {
          reactProps[slot] = node
        }
      }
      await expectSameHtml(
        AstroEquipmentSlot,
        { props, slots: astroSlots },
        createElement(EquipmentSlot, reactProps as never, slots.default?.[1]),
      )
    })
  }
})

describe('EquipmentSlots renders the same HTML in Astro and React', () => {
  for (const layout of [undefined, 'grid', 'list']) {
    it(layout ?? 'grid by default', async () => {
      await expectSameHtml(
        AstroEquipmentSlots,
        { props: { layout, 'aria-label': 'Equipment', class: 's' } },
        createElement(EquipmentSlots, { layout: layout as never, 'aria-label': 'Equipment', className: 's' }),
      )
    })
  }
})
