import type { Meta, StoryObj } from '@storybook/react-vite'
import pbt from '@xaroth.nl/design/favicon/pbt.svg'
import { matrix, Row, Rows } from './shared.tsx'

const meta = { title: 'Favicon', parameters: matrix } satisfies Meta

export default meta

// Browser tab colors: the favicon sits on either, independent of the site theme.
const tabs = [
  { label: 'light tab', background: '#ffffff', color: '#1f1f1f' },
  { label: 'dark tab', background: '#35363a', color: '#e8eaed' },
]
const sizes = [16, 32, 180]

export const Sizes: StoryObj = {
  render: () => (
    <Rows>
      {tabs.map((tab) => (
        <Row
          key={tab.label}
          label={`pbt, ${tab.label}, ${sizes.join(', ')} px`}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'end',
              gap: 24,
              padding: 16,
              background: tab.background,
              color: tab.color,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui', fontSize: 13 }}>
              <img
                src={pbt}
                width={16}
                height={16}
                alt="pbt favicon"
              />
              pbt
            </span>
            {sizes.map((size) => (
              <img
                key={size}
                src={pbt}
                width={size}
                height={size}
                alt={`pbt favicon at ${size} px`}
              />
            ))}
          </div>
        </Row>
      ))}
    </Rows>
  ),
}
