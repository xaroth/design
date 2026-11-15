import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bar } from '@xaroth.nl/design/react'
import { buildBar, buildHeader, resetNotice } from './Screens/screens.tsx'

const meta = {
  title: 'Bar',
  component: Bar,
  parameters: { layout: 'fullscreen' },
  // check-stories also runs these at phone width.
  tags: ['phone'],
  args: { notice: '' },
  argTypes: {
    notice: { control: 'text' },
    start: { control: false },
    end: { control: false },
  },
  // The bar sits under the app header, as in the app. Only the notice is a control: start and end take components.
  render: ({ notice }) => (
    <>
      {buildHeader}
      {buildBar({ notice: notice ? String(notice) : undefined })}
    </>
  ),
} satisfies Meta<typeof Bar>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Bar' }

export const WithNotice: StoryObj<typeof meta> = { name: 'Bar, notice', args: { notice: resetNotice } }

// The bar folds by its own width, so a 390 px box shows the narrow layout at any viewport.
const narrow = { maxWidth: 390, borderInline: '1px solid var(--x-color-line)' }

export const Narrow: StoryObj<typeof meta> = {
  name: 'Bar, 390 px',
  render: ({ notice }) => (
    <div style={narrow}>
      {buildHeader}
      {buildBar({ notice: notice ? String(notice) : undefined })}
    </div>
  ),
}

export const NarrowWithNotice: StoryObj<typeof meta> = {
  ...Narrow,
  name: 'Bar, 390 px, notice',
  args: { notice: resetNotice },
}
