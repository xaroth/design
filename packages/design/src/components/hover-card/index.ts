import { bem } from '../../bem.ts'

export type HoverCardOptions = {
  className?: string
}

const hoverCard = bem('x-hover-card')

export const hoverCardClass = ({ className }: HoverCardOptions = {}): string => hoverCard({}, className)

export const hoverCardXProperty = '--x-hover-card-x'
export const hoverCardYProperty = '--x-hover-card-y'

// Pixels from the container's top left corner. Non-finite values fall back to the corner.
export const hoverCardOffset = (value: number): string => `${Number.isFinite(value) ? value : 0}px`

export const hoverCardStyle = (x: number, y: number): string =>
  `${hoverCardXProperty}:${hoverCardOffset(x)};${hoverCardYProperty}:${hoverCardOffset(y)}`
