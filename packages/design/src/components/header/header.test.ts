import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Header } from '../../react.ts'
import { expectSameHtml } from '../../../test/compare.ts'
import { Header as AstroHeader } from '../../astro.ts'

const items = [
  { label: 'Home', href: '/', current: true },
  { label: 'Tools', href: '/tools' },
  { label: 'Blog', href: '/blog' },
]

// Brand, fields, actions and notice are named slots in Astro and ReactNode props in React; each case gives both forms.
const brand = { html: '<span>xaroth.nl</span>', react: () => createElement('span', null, 'xaroth.nl') }
const actions = {
  html: '<a class="x-button" href="/signin">Sign in</a>',
  react: () => createElement('a', { className: 'x-button', href: '/signin' }, 'Sign in'),
}

const fields = {
  html: '<label for="lv">Level</label><select id="lv"><option>90</option></select>',
  react: () => [
    createElement('label', { key: 'l', htmlFor: 'lv' }, 'Level'),
    createElement('select', { key: 's', id: 'lv' }, createElement('option', null, '90')),
  ],
}
const notice = { html: 'Saved.', react: () => 'Saved.' }

type Case = {
  name: string
  props: Record<string, unknown>
  brand?: boolean
  actions?: boolean
  fields?: boolean
  notice?: boolean
}

const cases: Case[] = [
  { name: 'default inline', props: { items }, brand: true },
  { name: 'stacked', props: { items, layout: 'stacked' }, brand: true },
  { name: 'inline with actions', props: { items, layout: 'inline' }, brand: true, actions: true },
  { name: 'stacked with actions', props: { items, layout: 'stacked' }, brand: true, actions: true },
  { name: 'brand link with label', props: { items, brandHref: '/', brandLabel: 'xaroth.nl, home' }, brand: true },
  { name: 'sticky', props: { items, sticky: true }, brand: true },
  { name: 'no current item', props: { items: items.map(({ current: _, ...i }) => i) }, brand: true },
  { name: 'custom labels', props: { items, navLabel: 'Site', menuLabel: 'Browse' }, brand: true },
  { name: 'no items', props: {}, brand: true, actions: true },
  { name: 'no brand', props: { items } },
  { name: 'extra class and attrs', props: { items, class: 'site-header', id: 'top' }, brand: true },
  { name: 'brand label without href is dropped', props: { items, brandLabel: 'Home' }, brand: true },
  { name: 'actions without items', props: { items: [] }, actions: true },
  { name: 'user role and id', props: { items, role: 'banner', id: 'top' }, brand: true, actions: true },
  { name: 'fields', props: { items }, brand: true, actions: true, fields: true },
  { name: 'fields, stacked', props: { items, layout: 'stacked' }, brand: true, fields: true },
  { name: 'notice', props: { items }, brand: true, notice: true },
  { name: 'fields and notice', props: {}, brand: true, actions: true, fields: true, notice: true },
]

describe('Header renders the same HTML in Astro and React', () => {
  for (const { name, props, brand: withBrand, actions: withActions, fields: withFields, notice: withNotice } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const slots: Record<string, string> = {}
      if (withBrand) {
        slots.brand = brand.html
      }
      if (withActions) {
        slots.actions = actions.html
      }
      if (withFields) {
        slots.fields = fields.html
      }
      if (withNotice) {
        slots.notice = notice.html
      }
      await expectSameHtml(
        AstroHeader,
        { props, slots },
        createElement(Header, {
          ...rest,
          className,
          brand: withBrand ? brand.react() : undefined,
          actions: withActions ? actions.react() : undefined,
          fields: withFields ? fields.react() : undefined,
          notice: withNotice ? notice.react() : undefined,
        } as never),
      )
    })
  }
})
