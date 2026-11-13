import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DescriptionListGroup,
  HoverCard,
  StatChange,
  StatChangeList,
  type StatChangeEffect,
} from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const meta = {
  title: 'StatChange/StatChange',
  component: StatChange,
  args: { name: 'Life', from: '1,140', to: '1,180', effect: 'better', label: '' },
  argTypes: {
    name: { control: 'text' },
    from: { control: 'text' },
    to: { control: 'text' },
    effect: { control: 'inline-radio', options: ['better', 'worse', 'neutral'] },
    label: { control: 'text' },
  },
  // A change is a dt/dd pair, so it always sits in a StatChangeList.
  render: ({ label, ...args }) => (
    <StatChangeList style={{ maxWidth: 320 }}>
      <StatChange
        {...args}
        label={label || undefined}
      />
    </StatChangeList>
  ),
} satisfies Meta<typeof StatChange>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'StatChange' }

const changes: { name: string; from: string; to: string; effect: StatChangeEffect }[] = [
  { name: 'Life', from: '1,140', to: '1,180', effect: 'better' },
  { name: 'Total DPS', from: '1,284', to: '1,390', effect: 'better' },
  { name: 'Mana Cost', from: '6', to: '8', effect: 'worse' },
  { name: 'Evasion', from: '312', to: '288', effect: 'worse' },
  { name: 'Light Radius', from: '100%', to: '110%', effect: 'neutral' },
]

const list = (label: string) => (
  <StatChangeList aria-label={label}>
    {changes.map((change) => (
      <StatChange
        key={change.name}
        {...change}
      />
    ))}
  </StatChangeList>
)

// The two places the part is made for: a hover card over the tree, and the stats panel.
export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="In a hover card">
        <div
          style={{
            position: 'relative',
            width: 420,
            maxWidth: '100%',
            height: 240,
            background: 'var(--x-color-surface)',
            border: '1px dashed var(--x-color-line-strong)',
          }}
        >
          <HoverCard
            x={40}
            y={24}
            title="Path of 3 points"
            lines={['+10 to maximum Life', '+20 to Evasion Rating']}
          >
            {list('Changes in the hover card')}
          </HoverCard>
        </div>
      </Row>
      <Row label="In the stats panel, compact">
        <div
          className="x-p-md x-density-compact"
          style={{ width: 300, background: 'var(--x-color-surface)' }}
        >
          <DescriptionListGroup
            title="Changes"
            level={2}
          >
            {list('Changes in the panel')}
          </DescriptionListGroup>
        </div>
      </Row>
      <Row label="Long names wrap, values stay on one line">
        <StatChangeList
          aria-label="Long names"
          style={{ width: 240 }}
        >
          <StatChange
            name="Chance to Block Spell Damage"
            from="0%"
            to="12%"
            effect="better"
          />
          <StatChange
            name="Reduced Extra Damage from Critical Strikes"
            from="0%"
            to="0%"
          />
        </StatChangeList>
      </Row>
    </Rows>
  ),
}
