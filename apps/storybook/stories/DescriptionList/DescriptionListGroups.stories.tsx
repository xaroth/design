import type { Meta, StoryObj } from '@storybook/react-vite'
import { DescriptionList, DescriptionListGroup, DescriptionListGroups } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const offence = [
  { term: 'Total DPS', value: '1.84M', change: { amount: '+12.4%', effect: 'better' as const } },
  { term: 'Hit Damage', value: '48,210' },
  { term: 'Attack Speed', value: '6.42/s' },
  { term: 'Crit Chance', value: '62.5%' },
  { term: 'Mana Cost', value: '14', change: { amount: '-4', effect: 'better' as const } },
]
const defences = [
  { term: 'Life', value: '5,412' },
  { term: 'Energy Shield', value: '1,208' },
  { term: 'Armour', value: '24,860' },
  { term: 'Evasion', value: '3,117' },
  { term: 'Spell Suppression', value: '100%' },
]
const resistances = [
  { term: 'Fire', value: '76%' },
  { term: 'Cold', value: '76%' },
  { term: 'Lightning', value: '75%' },
  { term: 'Chaos', value: '-12%', change: { amount: '-6%', effect: 'worse' as const } },
]

function Sheet({ layout, striped }: { layout?: 'stacked' | 'columns'; striped?: boolean }) {
  return (
    <DescriptionListGroups layout={layout}>
      {(
        [
          ['Offence', offence],
          ['Defences', defences],
          ['Resistances', resistances],
        ] as const
      ).map(([title, items]) => (
        <DescriptionListGroup
          key={title}
          title={title}
        >
          <DescriptionList
            layout="inline"
            dividers={!striped}
            striped={striped}
            items={[...items]}
          />
        </DescriptionListGroup>
      ))}
    </DescriptionListGroups>
  )
}

const meta = {
  title: 'DescriptionList/DescriptionListGroups',
  component: DescriptionListGroups,
  args: { layout: 'columns' },
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'columns'] },
  },
  render: (args) => <Sheet layout={args.layout} />,
} satisfies Meta<typeof DescriptionListGroups>

export default meta

export const Default: StoryObj<typeof meta> = {
  name: 'DescriptionListGroups',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 760 }}>
        <Story />
      </div>
    ),
  ],
}

// Columns follow the width of the area, not the viewport: the same groups stack in a side panel.
export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="Columns, 760px area"
        stack
      >
        <div style={{ maxWidth: 760 }}>
          <Sheet layout="columns" />
        </div>
      </Row>
      <Row
        label="Columns, 360px area"
        stack
      >
        <div style={{ maxWidth: 360 }}>
          <Sheet layout="columns" />
        </div>
      </Row>
      <Row
        label="Stacked, dense and striped"
        stack
      >
        <div
          className="x-density-dense"
          style={{ maxWidth: 360 }}
        >
          <Sheet
            layout="stacked"
            striped
          />
        </div>
      </Row>
    </Rows>
  ),
}
