import { describe, expect, it } from 'vitest'
import { describeTrigger, describedBy, tooltipId } from './index.ts'

describe('tooltip describedBy', () => {
  it('points at the tooltip id', () => {
    expect(tooltipId('scopes')).toBe('scopes-tip')
    expect(describedBy(undefined, 'scopes')).toBe('scopes-tip')
    expect(describedBy('', 'scopes')).toBe('scopes-tip')
  })

  it('keeps existing ids first and does not repeat its own', () => {
    expect(describedBy('note', 'scopes')).toBe('note scopes-tip')
    expect(describedBy(' scopes-tip  note ', 'scopes')).toBe('scopes-tip note')
  })
})

describe('describeTrigger', () => {
  it('keeps an existing aria-describedby', () => {
    expect(describeTrigger('<button aria-describedby="note">Scopes</button>', 'tip')).toBe(
      '<button aria-describedby="note tip-tip">Scopes</button>',
    )
  })

  it('does not repeat an id already there', () => {
    expect(describeTrigger('<button aria-describedby="tip-tip">Scopes</button>', 'tip')).toBe(
      '<button aria-describedby="tip-tip">Scopes</button>',
    )
  })

  it('describes the focusable element inside an astro-island', () => {
    const html =
      '<astro-island uid="1" props="{&quot;a&quot;:&quot;x > y&quot;}"><span class="icon"></span><button type="button">Info</button></astro-island>'
    expect(describeTrigger(html, 'tip')).toBe(
      '<astro-island uid="1" props="{&quot;a&quot;:&quot;x > y&quot;}"><span class="icon"></span><button type="button" aria-describedby="tip-tip">Info</button></astro-island>',
    )
  })

  it('skips leading whitespace, comments and style', () => {
    const html = '\n  <!-- trigger --><style>a>b{}</style>\n  <a href="/x">X</a>'
    expect(describeTrigger(html, 'tip')).toBe(
      '\n  <!-- trigger --><style>a>b{}</style>\n  <a href="/x" aria-describedby="tip-tip">X</a>',
    )
  })

  it('handles $ in ids', () => {
    expect(describeTrigger('<button>B</button>', "a$&$'")).toBe('<button aria-describedby="a$&amp;$\'-tip">B</button>')
  })

  it('falls back to the first element that is not a wrapper', () => {
    expect(describeTrigger('<astro-slot><abbr>HP</abbr></astro-slot>', 'tip')).toBe(
      '<astro-slot><abbr aria-describedby="tip-tip">HP</abbr></astro-slot>',
    )
  })

  it('returns plain text unchanged', () => {
    expect(describeTrigger('Just text', 'tip')).toBe('Just text')
  })
})
