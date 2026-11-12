import type { Meta, StoryObj } from '@storybook/react-vite'
import { DescriptionList } from '@xaroth.nl/design/react'
import { matrix, Row } from './shared.tsx'

const meta = { title: 'Density' } satisfies Meta

export default meta

const items = [
  { term: 'Life', value: '5,412' },
  { term: 'Energy Shield', value: '1,208' },
  { term: 'Armour', value: '24,860' },
  { term: 'Evasion', value: '3,117' },
  { term: 'Fire Resistance', value: '76%' },
  { term: 'Chaos Resistance', value: '-12%' },
  { term: 'Block Chance', value: '41%' },
  { term: 'Spell Suppression', value: '100%' },
]

const areas = [
  ['Theme default', ''],
  ['x-density-comfortable', 'x-density-comfortable'],
  ['x-density-compact', 'x-density-compact'],
  ['x-density-dense', 'x-density-dense'],
] as const

// One class on any container sets the row spacing and text size of the value lists inside it.
export const Density: StoryObj = {
  parameters: matrix,
  render: () => (
    <div
      className="x-gap-2xl"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', alignItems: 'start' }}
    >
      {areas.map(([label, className]) => (
        <Row
          key={label}
          label={label}
          stack
        >
          <div className={className || undefined}>
            <DescriptionList
              layout="inline"
              dividers
              items={items}
            />
          </div>
        </Row>
      ))}
      {areas.slice(1).map(([label, className]) => (
        <Row
          key={`${label}-plain`}
          label={`${label}, no dividers`}
          stack
        >
          <div className={className}>
            <DescriptionList
              layout="inline"
              items={items}
            />
          </div>
        </Row>
      ))}
    </div>
  ),
}
