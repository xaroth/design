import { describe, expect, it } from 'vitest'
import { timelineHeading, timelineItemClass } from './index.ts'

describe('timeline', () => {
  it('defaults headings to h3', () => {
    expect(timelineHeading()).toBe('h3')
    expect(timelineHeading(5)).toBe('h5')
  })

  it('marks the current item', () => {
    expect(timelineItemClass()).toBe('x-timeline__item')
    expect(timelineItemClass({ current: true })).toBe('x-timeline__item x-timeline__item--current')
  })
})
