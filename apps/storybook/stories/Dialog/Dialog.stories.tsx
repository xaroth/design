import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { useState } from 'react'
import { Button, Dialog, Table } from '@xaroth.nl/design/react'
import { InlineDialogs, matrix, Row, Rows } from '../shared.tsx'

const actions = (
  <>
    <Button variant="secondary">Close</Button>
    <Button>Copy fit</Button>
  </>
)

const actionRows = { none: undefined, buttons: actions }

const meta = {
  title: 'Dialog/Dialog',
  component: Dialog,
  args: {
    open: true,
    title: 'Fit details',
    children: 'Drake Navy Issue, shield PvE. All modules T2, rigs for EM and thermal.',
    size: 'sm',
    dismissible: true,
    closeButton: true,
    closeLabel: 'Close',
    actions: 'buttons' as never,
    onClose: () => {},
  },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    children: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    dismissible: { control: 'boolean' },
    closeButton: { control: 'boolean' },
    closeLabel: { control: 'text' },
    actions: { control: 'inline-radio', options: Object.keys(actionRows), mapping: actionRows },
    onClose: { control: false },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <>
        <Button
          variant="secondary"
          onClick={() => updateArgs({ open: true })}
        >
          Open dialog
        </Button>
        <Dialog
          {...args}
          onClose={() => updateArgs({ open: false })}
        />
      </>
    )
  },
} satisfies Meta<typeof Dialog>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Dialog' }

const closed = { open: false, onClose: () => {} }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Size sm, md">
        <InlineDialogs>
          {(['sm', 'md'] as const).map((size) => (
            <Dialog
              key={size}
              {...closed}
              id={`variant-${size}`}
              size={size}
              title={`Size ${size}`}
              actions={actions}
            >
              Drake Navy Issue, shield PvE. All modules T2, rigs for EM and thermal.
            </Dialog>
          ))}
        </InlineDialogs>
      </Row>
      <Row label="Title only, no close button, long body">
        <InlineDialogs>
          <Dialog
            {...closed}
            id="variant-title"
            title="Standings synced"
          />
          <Dialog
            {...closed}
            id="variant-no-close"
            title="Accept terms"
            closeButton={false}
            actions={<Button>Accept</Button>}
          >
            Third-party data is cached for up to one hour.
          </Dialog>
          <Dialog
            {...closed}
            id="variant-long"
            title="Terms"
            style={{ maxHeight: 320 }}
            actions={<Button>Accept</Button>}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i}>Paragraph {i + 1}. The body scrolls while the title and actions stay in view.</p>
            ))}
          </Dialog>
        </InlineDialogs>
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Not dismissible: close button disabled, Escape and backdrop blocked">
        <InlineDialogs>
          <Dialog
            {...closed}
            id="state-locked"
            title="Saving fit"
            dismissible={false}
          >
            Waiting for the server.
          </Dialog>
        </InlineDialogs>
      </Row>
    </Rows>
  ),
}

export const Mounted: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="Inside a table cell aligned to the end: text stays start aligned"
        stack
      >
        <Table
          label="Characters"
          columns={[
            { key: 'name', label: 'Character' },
            { key: 'remove', label: 'Remove', align: 'end' },
          ]}
          rows={[
            {
              name: 'Xaroth Brook',
              remove: (
                <InlineDialogs>
                  <Dialog
                    {...closed}
                    id="mounted-cell"
                    title="Remove character"
                  >
                    Remove Xaroth Brook and its stored token? Its synced data is deleted too, and every fit that uses it
                    loses its skills.
                  </Dialog>
                </InlineDialogs>
              ),
            },
          ]}
        />
      </Row>
    </Rows>
  ),
}

export const Nested: StoryObj<typeof meta> = {
  parameters: matrix,
  render: function Render() {
    const [outer, setOuter] = useState(false)
    const [inner, setInner] = useState(false)
    return (
      <>
        <Button
          variant="secondary"
          onClick={() => setOuter(true)}
        >
          Open outer dialog
        </Button>
        <Dialog
          open={outer}
          onClose={() => setOuter(false)}
          title="Discard changes"
          actions={<Button onClick={() => setInner(true)}>Export first</Button>}
        >
          Escape closes only the dialog on top, and focus returns to the button that opened it.
          <Dialog
            open={inner}
            onClose={() => setInner(false)}
            title="Export"
          >
            Export the fit before discarding it.
          </Dialog>
        </Dialog>
      </>
    )
  },
}
