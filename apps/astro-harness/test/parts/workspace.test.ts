import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Workspace } from '@xaroth.nl/design/react'
import { Workspace as AstroWorkspace } from '@xaroth.nl/design/astro'
import { expectSameHtml } from '../compare.ts'

const header = '<header>App</header>'
const panel = '<p>Details</p>'
const nav = '<nav aria-label="Views">Tabs</nav>'

const cases: { name: string; props: Record<string, unknown>; header?: boolean; nav?: boolean }[] = [
  { name: 'header, main and panel', props: { panelLabel: 'Stats' }, header: true },
  { name: 'nav above the main region', props: { panelLabel: 'Stats' }, header: true, nav: true },
  { name: 'scrolling main region', props: { panelLabel: 'Stats', scroll: true } },
  { name: 'scrolling view under a nav', props: { panelLabel: 'Stats', scroll: true }, nav: true },
  { name: 'no header', props: { panelLabel: 'Stats' } },
  { name: 'extra class and attributes', props: { panelLabel: 'Stats', class: 'app', id: 'shell' }, header: true },
]

describe('Workspace renders the same HTML in Astro and React', () => {
  for (const { name, props, header: withHeader, nav: withNav } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroWorkspace,
        { props, slots: { default: 'Tree', panel, ...(withHeader && { header }), ...(withNav && { nav }) } },
        createElement(
          Workspace,
          {
            ...(rest as { panelLabel: string }),
            className: className as string | undefined,
            header: withHeader ? createElement('header', null, 'App') : undefined,
            nav: withNav ? createElement('nav', { 'aria-label': 'Views' }, 'Tabs') : undefined,
            panel: createElement('p', null, 'Details'),
          },
          'Tree',
        ),
      )
    })
  }
})
