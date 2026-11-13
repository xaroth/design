import { describe, expect, it } from 'vitest'
import { tagState } from './index.ts'

describe('other state helpers', () => {
  it('tagState marks only active links current', () => {
    expect(tagState({ href: '/t', active: true })).toEqual({ tag: 'a', attrs: { href: '/t', 'aria-current': 'true' } })
    expect(tagState({ href: '/t' })).toEqual({ tag: 'a', attrs: { href: '/t' } })
    expect(tagState({ active: true })).toEqual({ tag: 'span', attrs: {} })
  })
})
