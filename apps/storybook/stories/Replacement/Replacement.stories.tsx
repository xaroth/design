import type { Meta, StoryObj } from '@storybook/react-vite'
import { Replacement, ReplacementList, Tag } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const meta = {
  title: 'Replacement/Replacement',
  component: Replacement,
  args: {
    from: 'Heart of Oak',
    to: 'Ritual of Might',
    lines: ['20% increased Melee Damage', '+18% to Melee Critical Strike Multiplier'],
    toLabel: 'becomes',
    gainsLabel: 'gains',
  },
  argTypes: {
    from: { control: 'text' },
    to: { control: 'text' },
    lines: { control: 'object' },
    toLabel: { control: 'text' },
    gainsLabel: { control: 'text' },
    meta: { control: false },
  },
  render: (args) => (
    <ReplacementList
      aria-label="Nodes in radius"
      style={{ maxWidth: 420 }}
    >
      <Replacement {...args} />
    </ReplacementList>
  ),
} satisfies Meta<typeof Replacement>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Replacement' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width={420}>
      <Row
        label="Replaced, and lines added where nothing replaces it"
        stack
      >
        <ReplacementList aria-label="Nodes in radius">
          <Replacement
            from="Heart of Oak"
            to="Ritual of Might"
            lines={['20% increased Melee Damage']}
          />
          <Replacement
            from="Strength"
            lines={['+4% to Chaos Resistance']}
          />
        </ReplacementList>
      </Row>
      <Row
        label="With marks after the names"
        stack
      >
        <ReplacementList aria-label="Nodes with marks">
          <Replacement
            from="Unwavering Stance"
            to="Corrupted Soul"
            lines={['50% of Non-Chaos Damage taken bypasses Energy Shield']}
            meta={<Tag>Keystone</Tag>}
          />
          <Replacement
            from="Armour"
            to="Chaos Resistance"
            lines={['+7% to Chaos Resistance']}
            meta={
              <>
                <Tag>Small</Tag>
                <Tag>Allocated</Tag>
              </>
            }
          />
        </ReplacementList>
      </Row>
      <Row
        label="Without lines; long names wrap"
        stack
      >
        <ReplacementList
          aria-label="Long names"
          style={{ maxWidth: 220 }}
        >
          <Replacement
            from="Thaumaturgical Aptitude of the Ancients"
            to="Revitalising Winds of the Vaal"
          />
        </ReplacementList>
      </Row>
    </Rows>
  ),
}
