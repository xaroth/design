import type { Meta, StoryObj } from '@storybook/react-vite'
import { DescriptionList, Header, Workspace } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const header = (navLabel: string) => (
  <Header
    brand={<span>App</span>}
    navLabel={navLabel}
    items={[
      { label: 'Build', href: '#', current: true },
      { label: 'Help', href: '#help' },
    ]}
  />
)

// Taller than any frame, to show the main region clips instead of scrolling the page.
const main = (
  <div style={{ display: 'grid', placeItems: 'center', height: '100%', minHeight: 1200 }}>
    <p className="x-muted">Main region</p>
  </div>
)

const panel = (rows: number) => (
  <div style={{ padding: 16 }}>
    <DescriptionList
      items={Array.from({ length: rows }, (_, i) => ({ term: `Value ${i + 1}`, value: String((i + 1) * 12) }))}
    />
  </div>
)

const headers = { header: header('Main'), none: undefined }

const meta = {
  title: 'Workspace',
  component: Workspace,
  parameters: { layout: 'fullscreen' },
  args: {
    panelLabel: 'Details',
    header: 'header' as never,
    panel: panel(30),
    children: main,
  },
  argTypes: {
    panelLabel: { control: 'text' },
    header: { control: 'inline-radio', options: Object.keys(headers), mapping: headers },
    panel: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Workspace>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Workspace' }

const frame = (id: string, width: number | string, height: number, rows: number, withHeader = true) => (
  <Workspace
    panelLabel={`Details ${id}`}
    header={withHeader ? header(`Main ${id}`) : undefined}
    panel={panel(rows)}
    style={{ width, height, outline: '1px dashed currentColor' }}
  >
    {main}
  </Workspace>
)

// The narrow layout follows the workspace's own width, so a 390px frame shows the phone layout at any viewport.
export const Variants: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'padded' },
  render: () => (
    <Rows>
      <Row
        label="Desktop: panel beside the main region, scrolling on its own"
        stack
      >
        {frame('desktop', '100%', 520, 30)}
      </Row>
      <Row
        label="390 px: panel below the main region, at most 40% of the height"
        stack
      >
        {frame('phone', 390, 720, 30)}
      </Row>
      <Row
        label="390 px, short panel: the main region takes the rest"
        stack
      >
        {frame('phone-short', 390, 720, 3)}
      </Row>
      <Row
        label="No header"
        stack
      >
        {frame('bare', '100%', 360, 6, false)}
      </Row>
    </Rows>
  ),
}
