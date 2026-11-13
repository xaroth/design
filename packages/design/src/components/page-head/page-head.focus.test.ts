// @vitest-environment happy-dom
import { act, createElement, createRef } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it } from 'vitest'
import { PageHead } from '../../react.ts'

// React warns about act() outside a test environment it recognises.
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })

it('an app moves focus to the title through titleRef', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = createRoot(host)
  const title = createRef<HTMLHeadingElement>()
  await act(async () => {
    root.render(createElement(PageHead, { title: 'Marauder', compact: true, titleFocusable: true, titleRef: title }))
  })

  title.current?.focus()

  expect(document.activeElement).toBe(title.current)
  expect(document.activeElement?.tagName).toBe('H1')
  // happy-dom focuses any element; a browser needs the tabindex.
  expect(title.current?.getAttribute('tabindex')).toBe('-1')
  await act(async () => root.unmount())
  host.remove()
})
