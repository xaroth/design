import { describe, expect, it } from 'vitest'
import { alertRole } from './index.ts'

describe('alertRole', () => {
  it('is a status unless urgent', () => {
    expect(alertRole()).toBe('status')
    expect(alertRole(false)).toBe('status')
    expect(alertRole(true)).toBe('alert')
  })

  it('lets a user role win, and null fall back', () => {
    expect(alertRole(true, 'log')).toBe('log')
    expect(alertRole(true, null)).toBe('alert')
  })
})
