import './item-card.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  itemCardClass,
  itemCardClasses as c,
  itemCardShowsBase,
  itemNameClass,
  itemModClass,
  itemModLine,
  itemModNote,
  itemRarityLabels,
  type ItemCardHeadingLevel,
  type ItemCardOptions,
  type ItemModLine,
} from './index.ts'

export type ItemCardProps = Omit<ItemCardOptions, 'className'> &
  Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    name: string
    /** The base type. Hidden when it equals the name. */
    base?: string
    implicits?: readonly ItemModLine[]
    mods?: readonly ItemModLine[]
    headingLevel?: ItemCardHeadingLevel
    /** Shown after a line that does not count. */
    uncountedLabel?: string
    /** Actions below the mods, for example remove. */
    children?: ReactNode
  }

function Mods({
  lines,
  className,
  uncountedLabel,
}: {
  lines: readonly ItemModLine[]
  className: string
  uncountedLabel: string
}) {
  return (
    <ul className={className}>
      {lines.map(itemModLine).map(({ text, counted }, i) => (
        <li
          key={i}
          className={itemModClass(counted)}
        >
          {text}
          {!counted && <span className="x-item-card__note">{itemModNote(uncountedLabel)}</span>}
        </li>
      ))}
    </ul>
  )
}

export function ItemCard({
  rarity,
  name,
  base,
  implicits = [],
  mods = [],
  headingLevel = 3,
  uncountedLabel = 'not counted',
  className,
  children,
  ...rest
}: ItemCardProps) {
  const Heading = `h${headingLevel}` as const
  return (
    <article
      {...rest}
      className={itemCardClass({ rarity, className })}
    >
      <div className={c.head}>
        <Heading className={c.name}>{name}</Heading>
        <span className={c.rarity}>{itemRarityLabels[rarity ?? 'normal']}</span>
        {itemCardShowsBase(name, base) && <p className={c.base}>{base}</p>}
      </div>
      {implicits.length > 0 && (
        <Mods
          lines={implicits}
          className={c.implicits}
          uncountedLabel={uncountedLabel}
        />
      )}
      {mods.length > 0 && (
        <Mods
          lines={mods}
          className={c.mods}
          uncountedLabel={uncountedLabel}
        />
      )}
      {children != null && <div className={c.footer}>{children}</div>}
    </article>
  )
}

export type ItemNameProps = Omit<ItemCardOptions, 'className'> & HTMLAttributes<HTMLSpanElement>

export function ItemName({ rarity, className, ...rest }: ItemNameProps) {
  return (
    <span
      {...rest}
      className={itemNameClass({ rarity, className })}
    />
  )
}
