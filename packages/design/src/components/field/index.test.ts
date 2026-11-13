import { describe, expect, it } from 'vitest'
import { choiceGroupAttrs, fieldControlAttrs, fieldIds, mergeDescribedBy, wireControlHtml } from './index.ts'

describe('field wiring', () => {
  it('derives help and error ids', () => {
    expect(fieldIds('cid')).toEqual({ help: 'cid-help', error: 'cid-error' })
  })

  it('sets only the id without help, error or required', () => {
    expect(fieldControlAttrs({ id: 'x' })).toEqual({
      id: 'x',
      'aria-describedby': undefined,
      'aria-invalid': undefined,
      required: undefined,
    })
  })

  it('describes help before error and marks invalid and required', () => {
    expect(fieldControlAttrs({ id: 'x', hasDescription: true, hasError: true, required: true })).toEqual({
      id: 'x',
      'aria-describedby': 'x-help x-error',
      'aria-invalid': 'true',
      required: true,
    })
    expect(fieldControlAttrs({ id: 'x', hasError: true })['aria-describedby']).toBe('x-error')
  })

  it('merges described-by lists without repeats', () => {
    expect(mergeDescribedBy(undefined, undefined)).toBeUndefined()
    expect(mergeDescribedBy('', '')).toBeUndefined()
    expect(mergeDescribedBy('x-help', 'note x-help')).toBe('x-help note')
  })

  it('makes radio groups a required, invalid radiogroup', () => {
    expect(choiceGroupAttrs({ id: 'g', kind: 'radio', hasError: true, required: true, describedBy: 'note' })).toEqual({
      id: 'g',
      role: 'radiogroup',
      'aria-describedby': 'g-error note',
      'aria-invalid': 'true',
      'aria-required': 'true',
    })
  })

  it('keeps checkbox groups a plain fieldset', () => {
    expect(
      choiceGroupAttrs({ id: 'g', kind: 'checkbox', hasDescription: true, hasError: true, required: true }),
    ).toEqual({
      id: 'g',
      role: undefined,
      'aria-describedby': 'g-help g-error',
      'aria-invalid': undefined,
      'aria-required': undefined,
    })
  })

  it('wires the first control inside wrappers and keeps its own attributes', () => {
    const attrs = fieldControlAttrs({ id: 'f', hasDescription: true, required: true })
    expect(wireControlHtml('<span class="wrap"><input id="own" aria-describedby="note" name="n"></span>', attrs)).toBe(
      '<span class="wrap"><input name="n" id="f" aria-describedby="f-help note" required></span>',
    )
  })

  it('does not add required twice', () => {
    const attrs = fieldControlAttrs({ id: 'f', required: true })
    expect(wireControlHtml('<select required></select>', attrs)).toBe('<select required id="f"></select>')
  })

  it('wires the input inside a choice label', () => {
    const attrs = fieldControlAttrs({ id: 'f', hasError: true })
    expect(wireControlHtml('<label><input type="checkbox"> Agree</label>', attrs)).toBe(
      '<label><input type="checkbox" id="f" aria-describedby="f-error" aria-invalid="true"> Agree</label>',
    )
  })
})
