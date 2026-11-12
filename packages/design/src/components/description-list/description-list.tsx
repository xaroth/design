import './description-list.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  descriptionListChangeLabel,
  descriptionListClass,
  descriptionListItemClass,
  type DescriptionListItem,
  type DescriptionListOptions,
} from './index.ts'

export type DescriptionListProps = Omit<HTMLAttributes<HTMLDListElement>, 'children'> &
  Omit<DescriptionListOptions, 'className'> & {
    items: DescriptionListItem<ReactNode>[]
  }

export function DescriptionList({ items, layout, dividers, className, ...rest }: DescriptionListProps) {
  return (
    <dl
      {...rest}
      className={descriptionListClass({ layout, dividers, className })}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={descriptionListItemClass(item.change)}
        >
          <dt className="x-description-list__term">{item.term}</dt>
          <dd className="x-description-list__value">
            {item.value}
            {item.change && (
              <span className="x-description-list__change">
                <span
                  className="x-description-list__arrow"
                  aria-hidden="true"
                />
                {item.change.amount}
                <span className="x-visually-hidden">{descriptionListChangeLabel(item.change)}</span>
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
