import './equipment-slot.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  equipmentSlotClass,
  equipmentSlotClasses as c,
  equipmentSlotLinkAttrs,
  equipmentSlotsClass,
  isEmptySlotContent,
  type EquipmentSlotHeadingLevel,
  type EquipmentSlotsOptions,
} from './index.ts'

export type EquipmentSlotsProps = Omit<EquipmentSlotsOptions, 'className'> & HTMLAttributes<HTMLUListElement>

// A list, so screen readers announce how many slots there are.
export function EquipmentSlots({ layout, className, ...rest }: EquipmentSlotsProps) {
  return (
    <ul
      {...rest}
      className={equipmentSlotsClass({ layout, className })}
    />
  )
}

export type EquipmentSlotProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> & {
  /** The slot's name, for example "Helmet". */
  label: ReactNode
  headingLevel?: EquipmentSlotHeadingLevel
  /** Makes the item, or the empty label, a link that chooses the slot, as in a list beside a detail view. */
  href?: string
  /** The slot is the chosen one. Marked on the link when there is one. */
  current?: boolean
  /** Buttons for the slot, for example paste or remove. */
  actions?: ReactNode
  /** Shown when the slot has no item. */
  emptyLabel?: ReactNode
  /** The item, usually an ItemCard. Leave out for an empty slot. */
  children?: ReactNode
}

export function EquipmentSlot({
  label,
  headingLevel = 3,
  href,
  current,
  actions,
  emptyLabel = 'Empty',
  className,
  children,
  ...rest
}: EquipmentSlotProps) {
  const Heading = `h${headingLevel}` as const
  const empty = isEmptySlotContent(children)
  const content = empty ? <p className={c.empty}>{emptyLabel}</p> : children
  return (
    <li
      {...rest}
      className={equipmentSlotClass({ empty, current, className })}
    >
      <div className={c.head}>
        <Heading className={c.label}>{label}</Heading>
        {actions != null && <div className={c.actions}>{actions}</div>}
      </div>
      <div className={c.body}>
        {href != null ? (
          <a
            className={c.link}
            {...equipmentSlotLinkAttrs(href, current)}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </li>
  )
}
