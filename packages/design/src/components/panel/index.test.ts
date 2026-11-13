import { describe, expect, it } from 'vitest'
import { panelClass } from './index.ts'

describe('stat and panel classes', () => {
  it('panel leaves out defaults and prefixes padding', () => {
    expect(panelClass()).toBe('x-panel')
    expect(panelClass({ variant: 'callout', padding: 'none', marks: true, className: 's' })).toBe(
      'x-panel x-panel--callout x-panel--pad-none x-panel--marks s',
    )
  })
})
