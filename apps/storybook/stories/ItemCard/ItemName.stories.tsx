import type { Meta, StoryObj } from '@storybook/react-vite'
import { ItemName } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'
import { item } from './items.ts'

const meta = {
  title: 'ItemCard/ItemName',
  component: ItemName,
  args: { rarity: 'rare', children: 'Doom Knuckle' },
  argTypes: {
    rarity: { control: 'inline-radio', options: ['normal', 'magic', 'rare', 'unique'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof ItemName>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'ItemName' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Rarities">
        {(['Belt', 'Boots', 'Gloves', 'Body Armour'] as const).map((slot) => (
          <ItemName
            key={slot}
            rarity={item(slot).rarity}
          >
            {item(slot).name}
          </ItemName>
        ))}
      </Row>
      <Row label="In a link">
        <a href="#gloves">
          <ItemName rarity="rare">Doom Knuckle</ItemName>
        </a>
      </Row>
    </Rows>
  ),
}
