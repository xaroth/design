import './replacement.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import { isEmptyContent } from '../../content.ts'
import { replacementClass, replacementClasses as c, replacementListClass, replacementToLabel } from './index.ts'

export type ReplacementListProps = HTMLAttributes<HTMLUListElement>

// A list, so screen readers announce how many entries there are. Name it with aria-label or aria-labelledby.
export function ReplacementList({ className, ...rest }: ReplacementListProps) {
  return (
    <ul
      {...rest}
      className={replacementListClass({ className })}
    />
  )
}

export type ReplacementProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> & {
  /** What is replaced, for example a node's name. */
  from: ReactNode
  /** What it becomes. Leave out when the lines are added to `from` instead. */
  to?: ReactNode
  /** What it gives after the change. */
  lines?: readonly string[]
  /** Short marks after the names, for example a tag. */
  meta?: ReactNode
  /** Spoken in place of the arrow. */
  toLabel?: string
  /** Shown after `from` when nothing replaces it. */
  gainsLabel?: ReactNode
}

export function Replacement({
  from,
  to,
  lines = [],
  meta,
  toLabel,
  gainsLabel = 'gains',
  className,
  ...rest
}: ReplacementProps) {
  const added = isEmptyContent(to)
  return (
    <li
      {...rest}
      className={replacementClass({ added, className })}
    >
      <p className={c.head}>
        <span className={c.from}>{from}</span>
        {added ? (
          <span className={c.gains}>{gainsLabel}</span>
        ) : (
          <>
            <span className={c.arrow}>
              <span aria-hidden="true">→</span>
              <span className="x-visually-hidden">{replacementToLabel(toLabel)}</span>
            </span>
            <span className={c.to}>{to}</span>
          </>
        )}
        {!isEmptyContent(meta) && <span className={c.meta}>{meta}</span>}
      </p>
      {lines.length > 0 && (
        <ul className={c.lines}>
          {lines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}
    </li>
  )
}
