import { describe, expect, it } from 'vitest'
import { avatarInitials } from './index.ts'

describe('other state helpers', () => {
  it('avatarInitials takes the first and last word', () => {
    expect(avatarInitials('xaroth brook')).toBe('XB')
    expect(avatarInitials('  Xaroth  ')).toBe('X')
    expect(avatarInitials('Ana de la Cruz')).toBe('AC')
    expect(avatarInitials('')).toBe('')
  })
})
