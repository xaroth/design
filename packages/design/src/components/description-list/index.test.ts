import { describe, expect, it } from 'vitest'
import { descriptionListChangeLabel, descriptionListItemClass } from './index.ts'

describe('description list changes', () => {
  it('marks the row with the effect', () => {
    expect(descriptionListItemClass()).toBe('x-description-list__item')
    expect(descriptionListItemClass({ amount: '+1', effect: 'better' })).toBe(
      'x-description-list__item x-description-list__item--better',
    )
    expect(descriptionListItemClass({ amount: '-1', effect: 'worse' })).toBe(
      'x-description-list__item x-description-list__item--worse',
    )
  })

  it('reads the effect, or the given label, after the amount', () => {
    expect(descriptionListChangeLabel({ amount: '-4', effect: 'better' })).toBe(' better')
    expect(descriptionListChangeLabel({ amount: '-4', effect: 'better', label: 'lower, better' })).toBe(
      ' lower, better',
    )
  })
})
