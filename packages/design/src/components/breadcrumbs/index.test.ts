import { describe, expect, it } from 'vitest'
import { breadcrumbState } from './index.ts'

describe('other state helpers', () => {
  it('breadcrumbState never links the last item', () => {
    expect(breadcrumbState({ label: 'Here', href: '/here' }, 2, 3).tag).toBe('span')
    expect(breadcrumbState({ label: 'Here', href: '/here' }, 2, 3).attrs).toMatchObject({ 'aria-current': 'page' })
    expect(breadcrumbState({ label: 'Up', href: '/' }, 0, 3)).toMatchObject({ tag: 'a', attrs: { href: '/' } })
    expect(breadcrumbState({ label: 'Group' }, 1, 3).tag).toBe('span')
  })
})
