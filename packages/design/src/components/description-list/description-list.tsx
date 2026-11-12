import './description-list.scss'
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import {
  descriptionListChangeLabel,
  descriptionListClass,
  descriptionListGroupClass,
  descriptionListGroupsClass,
  descriptionListGroupTag,
  descriptionListItemClass,
  type DescriptionListGroupLevel,
  type DescriptionListGroupsOptions,
  type DescriptionListItem,
  type DescriptionListOptions,
} from './index.ts'

export type DescriptionListProps = Omit<HTMLAttributes<HTMLDListElement>, 'children'> &
  Omit<DescriptionListOptions, 'className'> & {
    items: DescriptionListItem<ReactNode>[]
  }

export function DescriptionList({ items, layout, dividers, striped, className, ...rest }: DescriptionListProps) {
  return (
    <dl
      {...rest}
      className={descriptionListClass({ layout, dividers, striped, className })}
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

export type DescriptionListGroupsProps = Omit<DescriptionListGroupsOptions, 'className'> &
  HTMLAttributes<HTMLDivElement>

export function DescriptionListGroups({ layout, className, ...rest }: DescriptionListGroupsProps) {
  return (
    <div
      {...rest}
      className={descriptionListGroupsClass({ layout, className })}
    />
  )
}

export type DescriptionListGroupProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  level?: DescriptionListGroupLevel
  titleId?: string
}

// A titled list: the children are usually one DescriptionList.
export function DescriptionListGroup({
  title,
  level,
  titleId,
  className,
  children,
  ...rest
}: DescriptionListGroupProps) {
  return (
    <section
      {...rest}
      className={descriptionListGroupClass({ className })}
    >
      {createElement(
        descriptionListGroupTag(level),
        { className: 'x-description-list-group__title', id: titleId },
        title,
      )}
      {children}
    </section>
  )
}
