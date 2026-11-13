import { describe, expect, it } from 'vitest'
import { modalAttrs, modalCommand } from './index.ts'

describe('modal and dialog', () => {
  it('closes on Escape and backdrop unless not dismissible', () => {
    expect(modalAttrs({})).toEqual({ closedby: 'any' })
    expect(modalAttrs({ dismissible: false })).toEqual({ closedby: 'none' })
  })

  it('builds invoker command attributes', () => {
    expect(modalCommand('fit', 'show-modal')).toEqual({ commandfor: 'fit', command: 'show-modal' })
  })
})
