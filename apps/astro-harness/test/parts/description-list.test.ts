import { createElement } from 'react'
import { describe, it } from 'vitest'
import { DescriptionList } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { DescriptionList as AstroDescriptionList } from '@xaroth.nl/design/astro'

const items = [
  { term: 'Published', value: '2026-03-14' },
  { term: 'Read time', value: '6 min' },
  { term: 'Author', value: 'Xaroth Brook' },
]

describe('DescriptionList', () => {
  const cases: [string, Record<string, unknown>][] = [
    ['default', {}],
    ['stacked', { layout: 'stacked' }],
    ['inline', { layout: 'inline' }],
    ['columns', { layout: 'columns' }],
    ['inline with dividers', { layout: 'inline', dividers: true }],
    ['stacked with dividers', { dividers: true }],
    ['columns with dividers, extra class and id', { layout: 'columns', dividers: true, class: 'site', id: 'meta' }],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroDescriptionList,
        { props: { items, ...props } },
        createElement(DescriptionList, { items, ...rest, className: className as string | undefined }),
      )
    })
  }

  const changed = [
    { term: 'Total DPS', value: '1.84M', change: { amount: '+12.4%', effect: 'better' as const } },
    { term: 'Mana Cost', value: '14', change: { amount: '-4', effect: 'better' as const, label: 'lower, better' } },
    { term: 'Chaos Resistance', value: '-12%', change: { amount: '-6%', effect: 'worse' as const } },
    { term: 'Life', value: '5,412' },
  ]
  for (const layout of ['inline', 'stacked', 'columns'] as const) {
    it(`better and worse changes, ${layout}`, async () => {
      await expectSameHtml(
        AstroDescriptionList,
        { props: { items: changed, layout, dividers: true } },
        createElement(DescriptionList, { items: changed, layout, dividers: true }),
      )
    })
  }

  it('change next to a slotted value', async () => {
    const item = { term: 'Source', value: 'Tree', change: { amount: '+1', effect: 'better' as const } }
    await expectSameHtml(
      AstroDescriptionList,
      { props: { items: [item], layout: 'inline' }, slots: { 'value-0': '<a href="#tree">Tree</a>' } },
      createElement(DescriptionList, {
        layout: 'inline',
        items: [{ ...item, value: createElement('a', { href: '#tree' }, 'Tree') }],
      }),
    )
  })

  it('empty', async () => {
    await expectSameHtml(AstroDescriptionList, { props: { items: [] } }, createElement(DescriptionList, { items: [] }))
  })

  it('markup values through value slots', async () => {
    const links = [
      { term: 'GitHub', value: 'github.com/xaroth' },
      { term: 'EVE', value: 'Xaroth Brook' },
    ]
    await expectSameHtml(
      AstroDescriptionList,
      {
        props: { items: links, layout: 'inline' },
        slots: { 'value-0': '<a href="https://github.com/xaroth">github.com/xaroth</a>' },
      },
      createElement(DescriptionList, {
        layout: 'inline',
        items: [
          { ...links[0], value: createElement('a', { href: 'https://github.com/xaroth' }, links[0].value) },
          links[1],
        ],
      }),
    )
  })
})
