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
  /** Shades every other row, for long lists without dividers. */
  striped?: boolean
  className?: string
}

const descriptionList = bem('x-description-list', { defaults: { layout: 'stacked' } })

export const descriptionListClass = ({
  layout = 'stacked',
  dividers,
  striped,
  className,
}: DescriptionListOptions = {}): string => descriptionList({ layout, dividers, striped }, className)

// Astro: markup for one value goes in a named slot, overriding the item value.
export const descriptionListValueSlot = (index: number): string => `value-${index}`

export const descriptionListItemClass = (change?: DescriptionListChange): string =>
  descriptionList.el('item', { effect: change?.effect })

// Leading space so the hidden word does not run into the amount.
export const descriptionListChangeLabel = (change: DescriptionListChange): string => ` ${change.label ?? change.effect}`

// Titled lists in one area. Stacked: one under the other. Columns: side by side where the area is wide enough,
// one column where it is not.
export type DescriptionListGroupsLayout = 'stacked' | 'columns'

export type DescriptionListGroupsOptions = {
  layout?: DescriptionListGroupsLayout
  className?: string
}

export type DescriptionListGroupLevel = 2 | 3 | 4

export type DescriptionListGroupOptions = {
  className?: string
}

const groups = bem('x-description-list-groups', { defaults: { layout: 'stacked' } })
const group = bem('x-description-list-group')

export const descriptionListGroupsClass = ({
  layout = 'stacked',
  className,
}: DescriptionListGroupsOptions = {}): string => groups({ layout }, className)

export const descriptionListGroupClass = ({ className }: DescriptionListGroupOptions = {}): string =>
  group({}, className)

export const descriptionListGroupTag = (level: DescriptionListGroupLevel = 3) => `h${level}` as const
