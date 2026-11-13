import { describe, expect, it } from 'vitest'
import { brandState, navLinkAttrs } from './index.ts'

describe('header', () => {
  it('marks only the current nav link', () => {
    expect(navLinkAttrs({ label: 'Home', href: '/', current: true })).toEqual({ href: '/', 'aria-current': 'page' })
    expect(navLinkAttrs({ label: 'Tools', href: '/tools' })).toEqual({ href: '/tools' })
    expect(navLinkAttrs({ label: 'Tools', href: '/tools', current: false })).not.toHaveProperty('aria-current')
  })

  it('names the brand only when it is a link', () => {
    expect(brandState(undefined, 'Home')).toEqual({ tag: 'div', attrs: {} })
    expect(brandState('/', 'Home')).toEqual({ tag: 'a', attrs: { href: '/', 'aria-label': 'Home' } })
    expect(brandState('/')).toEqual({ tag: 'a', attrs: { href: '/' } })
  })
})
