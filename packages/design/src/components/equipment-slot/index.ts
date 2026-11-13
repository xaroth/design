import { bem } from '../../bem.ts'
import { isEmptyContent } from '../../content.ts'

// grid: a card per slot, for showing every item in full. list: a row per slot, for picking one to show elsewhere.
export type EquipmentSlotsLayout = 'grid' | 'list'
export type EquipmentSlotHeadingLevel = 2 | 3 | 4 | 5 | 6

export type EquipmentSlotsOptions = {
  layout?: EquipmentSlotsLayout
  className?: string
}

export type EquipmentSlotOptions = {
  empty?: boolean
  current?: boolean
  className?: string
}

const slots = bem('x-equipment-slots', { defaults: { layout: 'grid' } })
const slot = bem('x-equipment-slot')

export const equipmentSlotsClass = ({ layout = 'grid', className }: EquipmentSlotsOptions = {}): string =>
  slots({ layout }, className)

export const equipmentSlotClass = ({ empty, current, className }: EquipmentSlotOptions = {}): string =>
  slot({ empty, current }, className)

export const equipmentSlotClasses = {
  head: slot.el('head'),
  label: slot.el('label'),
  actions: slot.el('actions'),
  body: slot.el('body'),
  empty: slot.el('empty'),
  link: slot.el('link'),
} as const

// On the slot's link, which is what a screen reader lands on when choosing a slot.
export const equipmentSlotLinkAttrs = (href: string, current?: boolean) => ({
  href,
  ...(current && { 'aria-current': 'true' as const }),
})

export const isEmptySlotContent = isEmptyContent
