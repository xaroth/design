import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Workspace } from '@xaroth.nl/design/react'
import { Workspace as AstroWorkspace } from '@xaroth.nl/design/astro'
import { expectSameHtml } from '../compare.ts'

const header = '<header>App</header>'
const panel = '<p>Details</p>'

const cases: { name: string; props: Record<string, unknown>; header?: boolean }[] = [
  { name: 'header, main and panel', props: { panelLabel: 'Stats' }, header: true },
  { name: 'no header', props: { panelLabel: 'Stats' } },
  { name: 'extra class and attributes', props: { panelLabel: 'Stats', class: 'app', id: 'shell' }, header: true },
]

describe('Workspace renders the same HTML in Astro and React', () => {
  for (const { name, props, header: withHeader } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroWorkspace,
        { props, slots: { default: 'Tree', panel, ...(withHeader && { header }) } },
        createElement(
          Workspace,
          {
            ...(rest as { panelLabel: string }),
            className: className as string | undefined,
            header: withHeader ? createElement('header', null, 'App') : undefined,
            panel: createElement('p', null, 'Details'),
          },
          'Tree',
        ),
      )
    })
  }
})
