import { bem } from '../../bem.ts'

// Whether a change helps or hurts, which is not the same as its sign: less mana cost is better. Neutral: neither.
export type StatChangeEffect = 'better' | 'worse' | 'neutral'

export type StatChangeListOptions = {
  className?: string
}

export type StatChangeOptions = {
  effect?: StatChangeEffect
  className?: string
}

const list = bem('x-stat-change-list')
const change = bem('x-stat-change', { defaults: { effect: 'neutral' } })

export const statChangeListClass = ({ className }: StatChangeListOptions = {}): string => list({}, className)

export const statChangeClass = ({ effect = 'neutral', className }: StatChangeOptions = {}): string =>
  change({ effect }, className)

// Read after the new value. Neutral says nothing unless given a label: the two values already tell the change.
// Leading space so the word does not run into the value.
export const statChangeEffectLabel = (effect: StatChangeEffect = 'neutral', label?: string): string | undefined => {
  const word = label ?? (effect === 'neutral' ? undefined : effect)
  return word ? ` ${word}` : undefined
}

// Spoken between the values in place of the arrow.
export const statChangeToLabel = ' to '
