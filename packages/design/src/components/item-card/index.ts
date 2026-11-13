import { bem } from '../../bem.ts'

export type ItemRarity = 'normal' | 'magic' | 'rare' | 'unique'
export type ItemCardHeadingLevel = 2 | 3 | 4 | 5 | 6

/** A mod line. `counted: false` marks a line that is read but does not change the stats. */
export type ItemModLine = string | { text: string; counted?: boolean }

export type ItemCardOptions = {
  rarity?: ItemRarity
  className?: string
}

const card = bem('x-item-card', { defaults: { rarity: 'normal' } })

export const itemCardClass = ({ rarity = 'normal', className }: ItemCardOptions = {}): string =>
  card({ rarity }, className)

export const itemCardClasses = {
  head: card.el('head'),
  name: card.el('name'),
  rarity: card.el('rarity'),
  base: card.el('base'),
  mods: card.el('mods'),
  implicits: card.el('mods', { implicit: true }),
  footer: card.el('footer'),
} as const

export const itemRarityLabels: Record<ItemRarity, string> = {
  normal: 'Normal',
  magic: 'Magic',
  rare: 'Rare',
  unique: 'Unique',
}

export const itemModLine = (line: ItemModLine): { text: string; counted: boolean } =>
  typeof line === 'string' ? { text: line, counted: true } : { text: line.text, counted: line.counted ?? true }

export const itemModClass = (counted: boolean): string => card.el('mod', { uncounted: !counted })

// Leading space so screen readers do not run the note into the line.
export const itemModNote = (label: string): string => ` ${label}`

// The base line is left out when it would repeat the name, as on normal and magic items.
export const itemCardShowsBase = (name: string, base?: string): base is string => !!base && base !== name

const name = bem('x-item-name', { defaults: { rarity: 'normal' } })

// The name alone in its rarity color, for rows and links outside a card.
export const itemNameClass = ({ rarity = 'normal', className }: ItemCardOptions = {}): string =>
  name({ rarity }, className)
