import { describe, expect, it } from 'vitest'
import { progressClass, progressState, progressStyle } from './index.ts'

describe('progressState', () => {
  it('reports a value on 0..100 by default', () => {
    expect(progressState({ value: 72, label: 'Upload' })).toEqual({
      width: '72%',
      text: undefined,
      attrs: {
        role: 'progressbar',
        'aria-label': 'Upload',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': 72,
      },
    })
  })

  it('clamps into 0..max', () => {
    expect(progressState({ value: 140 }).attrs['aria-valuenow']).toBe(100)
    expect(progressState({ value: -5 }).attrs['aria-valuenow']).toBe(0)
    expect(progressState({ value: 12, max: 8 })).toMatchObject({ width: '100%', attrs: { 'aria-valuenow': 8 } })
  })

  it('falls back to 100 for a max that is not positive', () => {
    expect(progressState({ value: 50, max: 0 }).attrs['aria-valuemax']).toBe(100)
    expect(progressState({ value: 50, max: -3 }).attrs['aria-valuemax']).toBe(100)
  })

  it('is indeterminate without a value or with NaN', () => {
    for (const value of [undefined, Number.NaN]) {
      const state = progressState({ value, showValue: true })
      expect(state.width).toBeUndefined()
      expect(state.text).toBeUndefined()
      expect(state.attrs).not.toHaveProperty('aria-valuenow')
      expect(state.attrs).not.toHaveProperty('aria-valuetext')
    }
  })

  it('shows a rounded percentage as text and valuetext only with showValue', () => {
    expect(progressState({ value: 1, max: 3 })).toMatchObject({ width: '33.33%', text: undefined })
    expect(progressState({ value: 1, max: 3 }).attrs).not.toHaveProperty('aria-valuetext')
    const shown = progressState({ value: 1, max: 3, showValue: true })
    expect(shown.text).toBe('33%')
    expect(shown.attrs['aria-valuetext']).toBe('33%')
  })

  it('leaves out aria-label without a label', () => {
    expect(progressState({ value: 1 }).attrs).not.toHaveProperty('aria-label')
  })

  it('writes the width as a custom property', () => {
    expect(progressStyle('50%')).toBe('--x-progress:50%')
    expect(progressStyle(undefined)).toBeUndefined()
  })
})

describe('progressClass', () => {
  it('marks indeterminate, empty and done', () => {
    expect(progressClass()).toBe('x-progress x-progress--indeterminate')
    expect(progressClass({ value: 0 })).toBe('x-progress x-progress--empty')
    expect(progressClass({ value: 120 })).toBe('x-progress x-progress--done')
    expect(progressClass({ value: 50 })).toBe('x-progress')
  })

  it('adds a gradient from the start tone', () => {
    expect(progressClass({ value: 50, tone: 'success', startTone: 'danger', size: 'sm' })).toBe(
      'x-progress x-progress--sm x-progress--success x-progress--gradient x-progress--from-danger',
    )
  })
})
