import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, ItemCard } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'
import { item } from './items.ts'

const meta = {
  title: 'ItemCard/ItemCard',
  component: ItemCard,
  args: { ...item('Amulet'), headingLevel: 3, uncountedLabel: 'not counted' },
  argTypes: {
    rarity: { control: 'inline-radio', options: ['normal', 'magic', 'rare', 'unique'] },
    name: { control: 'text' },
    base: { control: 'text' },
    implicits: { control: 'object' },
    mods: { control: 'object' },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4, 5, 6] },
    uncountedLabel: { control: 'text' },
    children: { control: false },
  },
  render: (args) => (
    <div style={{ maxWidth: 340 }}>
      <ItemCard {...args} />
    </div>
  ),
} satisfies Meta<typeof ItemCard>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'ItemCard' }

const slots = ['Belt', 'Boots', 'Gloves', 'Body Armour'] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Rarities: normal, magic, rare, unique">
        {slots.map((slot) => (
          <div
            key={slot}
            style={{ width: 300 }}
          >
            <ItemCard {...item(slot)} />
          </div>
        ))}
      </Row>
      <Row label="Implicits apart from the mods; lines that do not count are marked">
        <div style={{ width: 340 }}>
          <ItemCard {...item('Amulet')} />
        </div>
      </Row>
      <Row label="With actions">
        <div style={{ width: 340 }}>
          <ItemCard {...item('Ring 1')}>
            <Button
              variant="secondary"
              size="sm"
            >
              Replace
            </Button>
            <Button
              variant="tertiary"
              tone="danger"
              size="sm"
            >
              Remove
            </Button>
          </ItemCard>
        </div>
      </Row>
      <Row label="Long names wrap">
        <div style={{ width: 220 }}>
          <ItemCard
            rarity="magic"
            name="Healthy Goliath Greaves of the Wind"
            mods={['+45 to maximum Life']}
          />
        </div>
      </Row>
    </Rows>
  ),
}
