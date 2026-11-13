import './hover-card.scss'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import {
  hoverCardClass,
  hoverCardOffset,
  hoverCardXProperty,
  hoverCardYProperty,
  type HoverCardOptions,
} from './index.ts'

export type HoverCardProps = Omit<HoverCardOptions, 'className'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'title'> & {
    /** The point, in pixels from the top left corner of the nearest positioned ancestor. */
    x: number
    y: number
    title?: ReactNode
    lines?: readonly ReactNode[]
  }

export function HoverCard({ x, y, title, lines = [], className, children, ...rest }: HoverCardProps) {
  const style = { [hoverCardXProperty]: hoverCardOffset(x), [hoverCardYProperty]: hoverCardOffset(y) } as CSSProperties
  return (
    <div
      {...rest}
      className={hoverCardClass({ className })}
      style={style}
    >
      <div className="x-hover-card__card">
        {title != null && <p className="x-hover-card__title">{title}</p>}
        {lines.length > 0 && (
          <ul className="x-hover-card__lines">
            {lines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
        {children != null && <div className="x-hover-card__body">{children}</div>}
      </div>
    </div>
  )
}
