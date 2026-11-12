// One option of a radio group, drawn as a card. The native radio is visually hidden inside the label, so arrow keys,
// form submission and the radiogroup role come from the browser. Place cards in a RadioGroup.

import { bem } from '../../bem.ts'
import { mergeTokens } from '../../html.ts'
import { cardClass } from '../card/index.ts'

const choiceCard = bem('x-choice-card')

// Carries the card block too, so each theme's card surface applies.
export const choiceCardClass = ({ className }: { className?: string } = {}): string =>
  choiceCard({}, cardClass(), className)

export const choiceCardIds = (id: string) => ({ title: `${id}-title`, text: `${id}-text` })

// The title names the radio and the text describes it, so a screen reader does not read the whole card as its name.
export const choiceCardInputAttrs = ({
  id,
  hasText,
  describedBy,
}: {
  id: string
  hasText: boolean
  describedBy?: string
}) => {
  const ids = choiceCardIds(id)
  return {
    id,
    type: 'radio' as const,
    'aria-labelledby': ids.title,
    'aria-describedby': mergeTokens(hasText && ids.text, describedBy) || undefined,
  }
}
