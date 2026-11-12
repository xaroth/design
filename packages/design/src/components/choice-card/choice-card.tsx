import '../card/card.scss'
import './choice-card.scss'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { choiceCardClass, choiceCardIds, choiceCardInputAttrs } from './index.ts'

export type ChoiceCardProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'title'> & {
  /** The radio's id; the title and text get `${id}-title` and `${id}-text`. */
  id: string
  title: ReactNode
  /** Image or illustration above the title. */
  media?: ReactNode
  /** Short text under the title. */
  children?: ReactNode
}

export function ChoiceCard({ id, title, media, className, children, ...rest }: ChoiceCardProps) {
  const hasText = children != null
  const ids = choiceCardIds(id)
  return (
    <label className={choiceCardClass({ className })}>
      <input
        {...rest}
        {...choiceCardInputAttrs({ id, hasText, describedBy: rest['aria-describedby'] })}
        className="x-choice-card__input"
      />
      {media != null && <span className="x-choice-card__media">{media}</span>}
      <span className="x-choice-card__head">
        <span
          className="x-card__title x-choice-card__title"
          id={ids.title}
        >
          {title}
        </span>
        <span
          className="x-choice-card__mark"
          aria-hidden="true"
        />
      </span>
      {hasText && (
        <span
          className="x-card__body x-choice-card__text"
          id={ids.text}
        >
          {children}
        </span>
      )}
    </label>
  )
}
