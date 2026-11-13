import { describe, expect, it } from 'vitest'
import { statClass, statGroupClass } from './index.ts'

describe('stat and panel classes', () => {
  it('stat group leaves out the default column count', () => {
    expect(statGroupClass()).toBe('x-stat-group x-stat-group--plain')
    expect(statGroupClass({ variant: 'framed', columns: 3, className: 'site' })).toBe(
      'x-stat-group x-stat-group--framed x-stat-group--cols-3 site',
    )
  })

  it('stat leaves out the default tone', () => {
    expect(statClass()).toBe('x-stat')
    expect(statClass({ tone: 'muted' })).toBe('x-stat x-stat--muted')
  })
})
