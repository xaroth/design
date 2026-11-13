import { describe, expect, it } from 'vitest'
import { buttonState } from './index.ts'

describe('buttonState', () => {
  it('is a plain button by default', () => {
    expect(buttonState({})).toEqual({ tag: 'button', attrs: { type: 'button' } })
  })

  it('disables natively', () => {
    expect(buttonState({ disabled: true }).attrs).toEqual({ type: 'button', disabled: true })
  })

  it('keeps a loading plain button focusable', () => {
    expect(buttonState({ loading: true }).attrs).toEqual({
      type: 'button',
      'aria-disabled': 'true',
      'aria-busy': 'true',
    })
  })

  it('disables a loading submit or reset natively', () => {
    for (const type of ['submit', 'reset'] as const) {
      expect(buttonState({ loading: true, type }).attrs).toEqual({ type, disabled: true, 'aria-busy': 'true' })
    }
  })

  it('prefers native disabled over aria-disabled when both apply', () => {
    expect(buttonState({ loading: true, disabled: true }).attrs).toEqual({
      type: 'button',
      disabled: true,
      'aria-busy': 'true',
    })
  })

  it('renders a link and drops the href when inactive', () => {
    expect(buttonState({ href: '/tools' })).toEqual({ tag: 'a', attrs: { href: '/tools' } })
    expect(buttonState({ href: '/tools', disabled: true })).toEqual({ tag: 'a', attrs: { 'aria-disabled': 'true' } })
    expect(buttonState({ href: '/tools', loading: true }).attrs).toEqual({
      'aria-disabled': 'true',
      'aria-busy': 'true',
    })
  })

  it('never gives a link a type', () => {
    expect(buttonState({ href: '', type: 'submit' }).attrs).toEqual({ href: '' })
  })
})
