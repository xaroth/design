import './stat-change.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  statChangeClass,
  statChangeEffectLabel,
  statChangeListClass,
  statChangeToLabel,
  type StatChangeListOptions,
  type StatChangeOptions,
} from './index.ts'

export type StatChangeListProps = Omit<StatChangeListOptions, 'className'> & HTMLAttributes<HTMLDListElement>

// A dl: each change is a name and its values, which screen readers announce as "Life: 100 to 120 better".
export function StatChangeList({ className, ...rest }: StatChangeListProps) {
  return (
    <dl
      {...rest}
      className={statChangeListClass({ className })}
    />
  )
}

export type StatChangeProps = Omit<StatChangeOptions, 'className'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    name: ReactNode
    /** The value before the change, formatted. */
    from: ReactNode
    /** The value after the change, formatted. */
    to: ReactNode
    /** Read after the new value; defaults to the effect, and to nothing when neutral. */
    label?: string
  }

export function StatChange({ effect, name, from, to, label, className, ...rest }: StatChangeProps) {
  const effectLabel = statChangeEffectLabel(effect, label)
  return (
    <div
      {...rest}
      className={statChangeClass({ effect, className })}
    >
      <dt className="x-stat-change__name">{name}</dt>
      <dd className="x-stat-change__values">
        <span className="x-stat-change__from">{from}</span>
        <span className="x-stat-change__arrow">
          <span aria-hidden="true">→</span>
          <span className="x-visually-hidden">{statChangeToLabel}</span>
        </span>
        <span className="x-stat-change__to">{to}</span>
        <span className="x-stat-change__mark">
          <span
            className="x-stat-change__shape"
            aria-hidden="true"
          />
          {effectLabel && <span className="x-visually-hidden">{effectLabel}</span>}
        </span>
      </dd>
    </div>
  )
}
