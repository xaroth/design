import { bem } from '../../bem.ts'

// Stacked: term above value. Inline: term left, value pushed right. Columns: term in a fixed column, value left
// next to it; stacks under 640px.
export type DescriptionListLayout = 'stacked' | 'inline' | 'columns'

// Whether a change helps or hurts, which is not the same as its sign: less mana cost is better.
export type DescriptionListEffect = 'better' | 'worse'

export type DescriptionListChange = {
  /** The change as shown, for example "+12.4%" or "-4". */
  amount: string
  effect: DescriptionListEffect
  /** Read after the amount by screen readers; defaults to the effect ("better", "worse"). */
  label?: string
}

export type DescriptionListItem<T = string> = { term: string; value: T; change?: DescriptionListChange }

export type DescriptionListOptions = {
  layout?: DescriptionListLayout
  dividers?: boolean
  className?: string
}

const descriptionList = bem('x-description-list', { defaults: { layout: 'stacked' } })

export const descriptionListClass = ({
  layout = 'stacked',
  dividers,
  className,
}: DescriptionListOptions = {}): string => descriptionList({ layout, dividers }, className)

// Astro: markup for one value goes in a named slot, overriding the item value.
export const descriptionListValueSlot = (index: number): string => `value-${index}`

export const descriptionListItemClass = (change?: DescriptionListChange): string =>
  descriptionList.el('item', { effect: change?.effect })

// Leading space so the hidden word does not run into the amount.
export const descriptionListChangeLabel = (change: DescriptionListChange): string => ` ${change.label ?? change.effect}`
