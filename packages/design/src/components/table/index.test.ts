import { describe, expect, it } from 'vitest'
import { tableCellAlign, tableCellClass } from './index.ts'

describe('tableCellClass', () => {
  it('gives start-aligned text cells no class', () => {
    expect(tableCellClass({ key: 'a', label: 'A' }, 'head')).toBeUndefined()
    expect(tableCellClass({ key: 'a', label: 'A' }, 'body')).toBeUndefined()
  })

  it('end-aligns numeric columns and adds the numeric look to body cells only', () => {
    const column = { key: 'n', label: 'N', numeric: true }
    expect(tableCellClass(column, 'head')).toBe('x-table__cell x-table__cell--end')
    expect(tableCellClass(column, 'body')).toBe('x-table__cell x-table__cell--end x-table__cell--num')
  })

  it('lets an explicit align win over numeric', () => {
    const column = { key: 'n', label: 'N', numeric: true, align: 'start' } as const
    expect(tableCellAlign(column)).toBe('start')
    expect(tableCellClass(column, 'head')).toBeUndefined()
    expect(tableCellClass(column, 'body')).toBe('x-table__cell x-table__cell--num')
    expect(tableCellClass({ key: 'c', label: 'C', align: 'center' }, 'head')).toBe(
      'x-table__cell x-table__cell--center',
    )
  })
})
