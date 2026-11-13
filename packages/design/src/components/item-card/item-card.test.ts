import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { ItemCard, ItemName } from '../../react.ts'
import { expectSameHtml } from '../../../test/compare.ts'
import { ItemCard as AstroItemCard, ItemName as AstroItemName } from '../../astro.ts'

// Astro takes the footer as HTML, or no slot, React the same content as children.
const cases: { name: string; props: Record<string, unknown>; body?: [string | undefined, ReactNode] }[] = [
  { name: 'normal by default, base equal to name', props: { name: 'Iron Ring', base: 'Iron Ring' } },
  {
    name: 'rare with implicits and mods',
    props: {
      rarity: 'rare',
      name: 'Doom Knuckle',
      base: 'Titan Gauntlets',
      implicits: ['+12 to Strength'],
      mods: ['+72 to maximum Life', '+38% to Fire Resistance'],
    },
  },
  {
    name: 'lines that do not count',
    props: {
      rarity: 'magic',
      name: 'Sapphire Ring of the Lynx',
      mods: [{ text: '+20 to Dexterity', counted: false }, { text: '+30 to maximum Mana', counted: true }, 'x'],
    },
  },
  {
    name: 'own note and heading level',
    props: {
      rarity: 'unique',
      name: 'Kaom’s Heart',
      base: 'Glorious Plate',
      mods: [{ text: '+500 to maximum Life', counted: false }],
      uncountedLabel: 'no effect yet',
      headingLevel: 4,
    },
  },
  {
    name: 'footer',
    props: { name: 'Leather Belt' },
    body: ['<button type="button">Remove</button>', createElement('button', { type: 'button' }, 'Remove')],
  },
  { name: 'false footer is empty', props: { name: 'Leather Belt' }, body: [undefined, false] },
  { name: 'whitespace footer is empty', props: { name: 'Leather Belt' }, body: ['  ', null] },
  { name: 'extra class and attrs', props: { name: 'A', class: 'item', id: 'helmet', 'data-slot': 'Helmet' } },
]

describe('ItemCard renders the same HTML in Astro and React', () => {
  for (const { name, props, body } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroItemCard,
        { props, slots: body?.[0] != null ? { default: body[0] } : {} },
        createElement(ItemCard, { ...rest, className } as never, body?.[1]),
      )
    })
  }
})

describe('ItemName renders the same HTML in Astro and React', () => {
  for (const rarity of [undefined, 'magic', 'rare', 'unique']) {
    it(rarity ?? 'normal by default', async () => {
      await expectSameHtml(
        AstroItemName,
        { props: { rarity, class: 'n' }, slots: { default: 'Doom Knuckle' } },
        createElement(ItemName, { rarity: rarity as never, className: 'n' }, 'Doom Knuckle'),
      )
    })
  }
})
