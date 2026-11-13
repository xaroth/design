import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, EquipmentSlot, EquipmentSlots, ItemCard, ItemName } from '@xaroth.nl/design/react'
import { equipment, item } from '../ItemCard/items.ts'
import { matrix, Row, Rows } from '../shared.tsx'

const paste = (
  <Button
    variant="secondary"
    size="sm"
  >
    Paste item
  </Button>
)

const remove = (
  <Button
    variant="tertiary"
    size="sm"
  >
    Remove
  </Button>
)

const contents = { item: 'item', empty: 'empty' }

const meta = {
  title: 'EquipmentSlot/EquipmentSlot',
  component: EquipmentSlot,
  args: { label: 'Gloves', headingLevel: 3, current: false, emptyLabel: 'Empty', children: 'item' as never },
  argTypes: {
    label: { control: 'text' },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4, 5, 6] },
    current: { control: 'boolean' },
    emptyLabel: { control: 'text' },
    children: { control: 'inline-radio', options: Object.keys(contents) },
    actions: { control: false },
  },
  // A slot is a list item, so it always sits in EquipmentSlots.
  render: ({ children, ...args }) => {
    const filled = (children as unknown) === 'item'
    return (
      <EquipmentSlots style={{ maxWidth: 340 }}>
        <EquipmentSlot
          {...args}
          actions={filled ? remove : paste}
        >
          {filled ? (
            <ItemCard
              {...item('Gloves')}
              headingLevel={4}
            />
          ) : undefined}
        </EquipmentSlot>
      </EquipmentSlots>
    )
  },
} satisfies Meta<typeof EquipmentSlot>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'EquipmentSlot' }

const some = equipment.filter(({ slot }) => ['Weapon 1', 'Weapon 2', 'Gloves', 'Amulet', 'Ring 2'].includes(slot))

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="Grid: a card per slot, columns follow the width"
        stack
      >
        <EquipmentSlots aria-label="Equipment, grid">
          {some.map(({ slot, item: it }) => (
            <EquipmentSlot
              key={slot}
              label={slot}
              actions={it ? remove : paste}
            >
              {it && (
                <ItemCard
                  {...it}
                  headingLevel={4}
                />
              )}
            </EquipmentSlot>
          ))}
        </EquipmentSlots>
      </Row>
      <Row
        label="List: a row per slot, the current one marked"
        stack
      >
        <EquipmentSlots
          layout="list"
          aria-label="Equipment, list"
          style={{ maxWidth: 380 }}
        >
          {some.map(({ slot, item: it }) => (
            <EquipmentSlot
              key={slot}
              label={slot}
              current={slot === 'Gloves'}
            >
              {it && (
                <a href={`#${slot}`}>
                  <ItemName rarity={it.rarity}>{it.name}</ItemName>
                </a>
              )}
            </EquipmentSlot>
          ))}
        </EquipmentSlots>
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Empty, empty with an own label, current">
        <EquipmentSlots
          aria-label="States"
          style={{ width: '100%' }}
        >
          <EquipmentSlot
            label="Ring 2"
            actions={paste}
          />
          <EquipmentSlot
            label="Weapon 2"
            emptyLabel="Blocked by a two-handed weapon"
          />
          <EquipmentSlot
            label="Belt"
            current
          >
            <ItemCard
              {...item('Belt')}
              headingLevel={4}
            />
          </EquipmentSlot>
        </EquipmentSlots>
      </Row>
    </Rows>
  ),
}
