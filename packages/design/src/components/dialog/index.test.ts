import { describe, expect, it } from 'vitest'
import { confirmFocus, dialogIds } from './index.ts'

describe('modal and dialog', () => {
  it('derives title and body ids', () => {
    expect(dialogIds('fit')).toEqual({ title: 'fit-title', body: 'fit-body' })
  })

  it('starts danger confirmations on cancel', () => {
    expect(confirmFocus('danger')).toEqual({ cancel: true, confirm: false })
    expect(confirmFocus()).toEqual({ cancel: false, confirm: true })
  })
})
