import './equipment-slot.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  equipmentSlotAttrs,
  equipmentSlotClass,
  equipmentSlotClasses as c,
  equipmentSlotsClass,
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
  /** The slot is the one shown elsewhere, as in a list beside a detail view. */
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
  current,
  actions,
  emptyLabel = 'Empty',
  className,
  children,
  ...rest
}: EquipmentSlotProps) {
  const Heading = `h${headingLevel}` as const
  const empty = children == null
  return (
    <li
      {...rest}
      {...equipmentSlotAttrs(current)}
      className={equipmentSlotClass({ empty, current, className })}
    >
      <div className={c.head}>
        <Heading className={c.label}>{label}</Heading>
        {actions != null && <div className={c.actions}>{actions}</div>}
      </div>
      <div className={c.body}>{empty ? <p className={c.empty}>{emptyLabel}</p> : children}</div>
    </li>
  )
}
