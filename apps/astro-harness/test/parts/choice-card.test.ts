import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { ChoiceCard } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { ChoiceCard as AstroChoiceCard } from '@xaroth.nl/design/astro'

// An svg, not an img: React adds a preload link for images.
const image = '<svg viewBox="0 0 16 9"></svg>'
const reactImage = createElement('svg', { viewBox: '0 0 16 9' })

// Astro takes named slots as HTML strings, React the same content as ReactNode props.
const cases: {
  name: string
  props: Record<string, unknown>
  text?: string
  slots?: Partial<Record<'title' | 'media', [string, ReactNode]>>
}[] = [
  { name: 'title only', props: { id: 'c1', name: 'pick', value: 'a', title: 'Amarr' } },
  { name: 'title and text', props: { id: 'c1', name: 'pick', value: 'a', title: 'Amarr' }, text: 'Lasers.' },
  {
    name: 'title slot with markup',
    props: { id: 'c1', name: 'pick' },
    slots: { title: ['<em>Amarr</em> Empire', [createElement('em', { key: 1 }, 'Amarr'), ' Empire']] },
  },
  {
    name: 'media',
    props: { id: 'c1', name: 'pick', title: 'Amarr' },
    text: 'Lasers.',
    slots: { media: [image, reactImage] },
  },
  { name: 'checked', props: { id: 'c1', name: 'pick', title: 'Amarr', checked: true } },
  { name: 'disabled, required', props: { id: 'c1', name: 'pick', title: 'Amarr', disabled: true, required: true } },
  {
    name: 'own describedby, extra class',
    props: { id: 'c1', name: 'pick', title: 'Amarr', class: 'site', 'aria-describedby': 'hint' },
    text: 'Lasers.',
  },
]

describe('ChoiceCard renders the same HTML in Astro and React', () => {
  for (const { name, props, text, slots = {} } of cases) {
    it(name, async () => {
      const { class: className, checked, ...rest } = props
      const astroSlots: Record<string, string> = {}
      const reactProps: Record<string, unknown> = { ...rest, className, defaultChecked: checked }
      if (text) {
        astroSlots.default = text
      }
      for (const [slot, [html, node]] of Object.entries(slots) as [string, [string, ReactNode]][]) {
        astroSlots[slot] = html
        reactProps[slot] = node
      }
      await expectSameHtml(
        AstroChoiceCard,
        { props, slots: astroSlots },
        createElement(ChoiceCard, reactProps as never, text),
        // `hint` is a page element outside the card.
        { externalIds: ['hint'] },
      )
    })
  }
})
