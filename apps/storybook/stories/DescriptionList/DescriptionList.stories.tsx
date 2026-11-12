import type { Meta, StoryObj } from '@storybook/react-vite'
import { DescriptionList } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const meta = {
  title: 'DescriptionList/DescriptionList',
  component: DescriptionList,
  args: {
    layout: 'inline',
    dividers: true,
    striped: false,
    items: [
      { term: 'Published', value: <time dateTime="2026-03-14">14 Mar 2026</time> },
      { term: 'Read time', value: '6 min' },
      { term: 'Author', value: 'Xaroth Brook' },
      { term: 'GitHub', value: <a href="https://github.com/xaroth">github.com/xaroth</a> },
    ],
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'inline', 'columns'] },
    dividers: { control: 'boolean' },
    striped: { control: 'boolean' },
    items: { control: false },
  },
} satisfies Meta<typeof DescriptionList>

export default meta

export const Default: StoryObj<typeof meta> = {
  name: 'DescriptionList',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}

const layouts = ['stacked', 'inline', 'columns'] as const
const lines = [
  ['dividers', true, false],
  ['no dividers', false, false],
  ['striped', false, true],
] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: (args) => (
    <div
      className="x-gap-2xl"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))' }}
    >
      {layouts.flatMap((layout) =>
        lines.map(([label, dividers, striped]) => (
          <Row
            key={`${layout}-${label}`}
            label={`${layout}, ${label}`}
            stack
          >
            <DescriptionList
              layout={layout}
              dividers={dividers}
              striped={striped}
              items={args.items}
            />
          </Row>
        )),
      )}
    </div>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width={360}>
      <Row
        label="Long values wrap"
        stack
      >
        <DescriptionList
          layout="inline"
          dividers
          items={[
            { term: 'Scopes', value: 'esi-characters.read_standings.v1, esi-characters.read_achievements.v1' },
            { term: 'Compatibility date', value: '2026-09-01' },
          ]}
        />
      </Row>
      <Row
        label="Better and worse changes"
        stack
      >
        <DescriptionList
          layout="inline"
          dividers
          items={[
            { term: 'Total DPS', value: '1.84M', change: { amount: '+12.4%', effect: 'better' } },
            { term: 'Hit Damage', value: '48,210' },
            { term: 'Mana Cost', value: '14', change: { amount: '-4', effect: 'better' } },
            { term: 'Chaos Resistance', value: '-12%', change: { amount: '-6%', effect: 'worse' } },
          ]}
        />
      </Row>
      <Row
        label="Changes, stacked"
        stack
      >
        <DescriptionList
          items={[
            { term: 'Total DPS', value: '1.84M', change: { amount: '+12.4%', effect: 'better' } },
            { term: 'Chaos Resistance', value: '-12%', change: { amount: '-6%', effect: 'worse' } },
          ]}
        />
      </Row>
      <Row
        label="Single item"
        stack
      >
        <DescriptionList items={[{ term: 'Last sync', value: '14:02 EVE time' }]} />
      </Row>
    </Rows>
  ),
}
