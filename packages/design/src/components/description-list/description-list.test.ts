import { createElement } from 'react'
import { describe, it } from 'vitest'
import { DescriptionList, DescriptionListGroup, DescriptionListGroups } from '../../react.ts'
import { expectSameHtml } from '../../../test/compare.ts'
import {
  DescriptionList as AstroDescriptionList,
  DescriptionListGroup as AstroDescriptionListGroup,
  DescriptionListGroups as AstroDescriptionListGroups,
} from '../../astro.ts'

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
    ['inline striped', { layout: 'inline', striped: true }],
    ['inline striped with dividers', { layout: 'inline', striped: true, dividers: true }],
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

describe('DescriptionListGroups', () => {
  const body = '<p>Content</p>'
  const children = createElement('p', null, 'Content')
  const cases: [string, Record<string, unknown>][] = [
    ['default', {}],
    ['stacked', { layout: 'stacked' }],
    ['columns, extra class and id', { layout: 'columns', class: 'site', id: 'sheet' }],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroDescriptionListGroups,
        { props, slots: { default: body } },
        createElement(DescriptionListGroups, { ...rest, className: className as string | undefined }, children),
      )
    })
  }
})

describe('DescriptionListGroup', () => {
  const body = '<p>Content</p>'
  const children = createElement('p', null, 'Content')
  const cases: [string, Record<string, unknown>][] = [
    ['default level', { title: 'Offence' }],
    ['level 2 with title id', { title: 'Offence', level: 2, titleId: 'offence' }],
    ['level 4, extra class', { title: 'Offence', level: 4, class: 'site' }],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroDescriptionListGroup,
        { props, slots: { default: body } },
        createElement(
          DescriptionListGroup,
          { ...(rest as { title: string }), className: className as string | undefined },
          children,
        ),
      )
    })
  }
})
