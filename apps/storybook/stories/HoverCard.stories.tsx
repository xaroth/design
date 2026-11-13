import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard } from '@xaroth.nl/design/react'
import type { ReactNode } from 'react'
import { matrix, Row, Rows } from './shared.tsx'

const width = 420
const height = 240
const lines = ['+10 to maximum Life', '5% increased maximum Life', 'Regenerate 0.5% of Life per second']

// A positioned container with a dot at the point, standing in for a canvas.
function Area({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        width,
        maxWidth: '100%',
        height,
        background: 'var(--x-color-surface)',
        border: '1px dashed var(--x-color-line-strong)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 6,
          height: 6,
          margin: '-3px 0 0 -3px',
          borderRadius: '50%',
          background: 'var(--x-color-accent)',
        }}
      />
      {children}
    </div>
  )
}

const meta = {
  title: 'HoverCard',
  component: HoverCard,
  args: { x: 120, y: 60, title: 'Heart of the Warrior', lines },
  argTypes: {
    x: { control: { type: 'range', min: 0, max: width } },
    y: { control: { type: 'range', min: 0, max: height } },
    title: { control: 'text' },
    lines: { control: 'object' },
  },
  render: (args) => (
    <Area
      x={args.x}
      y={args.y}
    >
      <HoverCard {...args} />
    </Area>
  ),
} satisfies Meta<typeof HoverCard>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'HoverCard' }

const corners = [
  { name: 'Top left', x: 16, y: 16 },
  { name: 'Top right', x: width - 16, y: 16 },
  { name: 'Bottom left', x: 16, y: height - 16 },
  { name: 'Bottom right', x: width - 16, y: height - 16 },
]

// The card flips to whichever side of the point has room and never leaves the container.
export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Corners">
        {corners.map(({ name, x, y }) => (
          <Area
            key={name}
            x={x}
            y={y}
          >
            <HoverCard
              x={x}
              y={y}
              title="Heart of the Warrior"
              lines={lines}
            />
          </Area>
        ))}
      </Row>
      <Row label="Title only, and a body after the lines">
        <Area
          x={200}
          y={120}
        >
          <HoverCard
            x={200}
            y={120}
            title="Strength"
          />
        </Area>
        <Area
          x={60}
          y={40}
        >
          <HoverCard
            x={60}
            y={40}
            title="Path of 3 points"
            lines={['+10 to Strength', '+10 to Dexterity']}
          >
            Allocates 2 nodes on the way.
          </HoverCard>
        </Area>
      </Row>
    </Rows>
  ),
}
