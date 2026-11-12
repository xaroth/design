import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChoiceCard, RadioGroup } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const art = (
  <svg
    viewBox="0 0 160 72"
    aria-hidden="true"
  >
    <rect
      width="160"
      height="72"
      fill="currentColor"
      opacity="0.12"
    />
    <circle
      cx="80"
      cy="36"
      r="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.5"
    />
  </svg>
)

const media = { none: undefined, image: art }

const factions = [
  { value: 'amarr', title: 'Amarr', text: 'Lasers and armor. Slow, hard to break.' },
  { value: 'caldari', title: 'Caldari', text: 'Missiles and shields at range.' },
  { value: 'gallente', title: 'Gallente', text: 'Drones and blasters up close.' },
  { value: 'minmatar', title: 'Minmatar', text: 'Projectiles and speed.' },
]

const meta = {
  title: 'ChoiceCard',
  component: ChoiceCard,
  args: {
    id: 'faction-amarr',
    name: 'faction',
    value: 'amarr',
    title: 'Amarr',
    children: 'Lasers and armor. Slow, hard to break.',
    media: 'image' as never,
    defaultChecked: true,
    disabled: false,
  },
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
    media: { control: 'inline-radio', options: Object.keys(media), mapping: media },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ChoiceCard>

export default meta

export const Default: StoryObj<typeof meta> = {
  name: 'ChoiceCard',
  decorators: [
    (Story) => (
      <RadioGroup
        id="faction"
        legend="Faction"
        style={{ maxWidth: 320 }}
      >
        <Story />
      </RadioGroup>
    ),
  ],
}

const group = (id: string, options: { orientation?: 'vertical' | 'horizontal'; withMedia?: boolean } = {}) => (
  <RadioGroup
    id={id}
    legend="Faction"
    description="Arrow keys move the selection."
    orientation={options.orientation ?? 'horizontal'}
  >
    {factions.map(({ value, title, text }, i) => (
      <ChoiceCard
        key={value}
        id={`${id}-${value}`}
        name={id}
        value={value}
        title={title}
        media={options.withMedia ? art : undefined}
        defaultChecked={i === 0}
      >
        {text}
      </ChoiceCard>
    ))}
  </RadioGroup>
)

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="Horizontal group with images"
        stack
      >
        {group('v-media', { withMedia: true })}
      </Row>
      <Row
        label="Horizontal group, text only"
        stack
      >
        {group('v-text')}
      </Row>
      <Row
        label="Vertical group"
        stack
      >
        <div style={{ maxWidth: 360 }}>{group('v-vertical', { orientation: 'vertical' })}</div>
      </Row>
      <Row
        label="Title only"
        stack
      >
        <RadioGroup
          id="v-title"
          legend="Server"
          orientation="horizontal"
        >
          {['Tranquility', 'Singularity'].map((server, i) => (
            <ChoiceCard
              key={server}
              id={`v-title-${i}`}
              name="v-title"
              value={server}
              title={server}
              defaultChecked={i === 0}
            />
          ))}
        </RadioGroup>
      </Row>
    </Rows>
  ),
}

const state = (id: string, extra: object = {}) => (
  <ChoiceCard
    id={id}
    name={id}
    value="amarr"
    title="Amarr"
    media={art}
    {...extra}
  >
    Lasers and armor. Slow, hard to break.
  </ChoiceCard>
)

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  // :focus-visible has no static form, so the story focuses one card the way a keyboard user would land on it.
  play: ({ canvasElement }) => {
    canvasElement.querySelector<HTMLInputElement>('#s-focused')?.focus()
  },
  render: () => (
    <Rows>
      <Row
        label="Unselected, selected, focused, disabled, disabled and selected"
        stack
      >
        <RadioGroup
          id="s-states"
          legend="States"
          orientation="horizontal"
        >
          {state('s-unselected')}
          {state('s-selected', { defaultChecked: true })}
          {state('s-focused')}
          {state('s-disabled', { disabled: true })}
          {state('s-disabled-selected', { disabled: true, defaultChecked: true })}
        </RadioGroup>
      </Row>
    </Rows>
  ),
}
