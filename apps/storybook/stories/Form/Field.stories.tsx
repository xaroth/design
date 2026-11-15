import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, Input, Select, Switch, Textarea } from '@xaroth.nl/design/react'
import { matrix } from '../shared.tsx'

const meta = {
  title: 'Form/Field',
  component: Field,
  args: {
    id: 'character',
    label: 'Character name',
    description: 'As shown in the character sheet.',
    error: '',
    required: false,
    layout: 'stacked',
    children: <Input placeholder="Xaroth Brook" />,
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    layout: { control: 'inline-radio', options: ['stacked', 'inline'] },
    children: { control: false },
  },
} satisfies Meta<typeof Field>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Field' }

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', alignItems: 'start' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <div
      className="x-gap-xl"
      style={grid}
    >
      <Field
        id="v-input"
        label="Character name"
        description="As shown in the character sheet."
      >
        <Input placeholder="Xaroth Brook" />
      </Field>
      <Field
        id="v-select"
        label="Faction"
      >
        <Select>
          <option>Caldari State</option>
          <option>Amarr Empire</option>
        </Select>
      </Field>
      <Field
        id="v-textarea"
        label="Fitting notes"
        description="Markdown is not supported."
      >
        <Textarea rows={3} />
      </Field>
      <Field
        id="v-switch"
        description="Every 5 minutes while this tab is open."
      >
        <Switch>Auto refresh</Switch>
      </Field>
    </div>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <div
      className="x-gap-xl"
      style={grid}
    >
      <Field
        id="s-required"
        label="Character name"
        required
      >
        <Input />
      </Field>
      <Field
        id="s-invalid"
        label="Character name"
        description="As shown in the character sheet."
        error="No character with that name on Tranquility."
        required
      >
        <Input defaultValue="Xaroth Brok" />
      </Field>
      <Field
        id="s-invalid-select"
        label="Faction"
        error="Pick a faction."
      >
        <Select defaultValue="">
          <option
            value=""
            disabled
          >
            Pick a faction
          </option>
          <option>Caldari State</option>
        </Select>
      </Field>
      <Field
        id="s-invalid-textarea"
        label="Fitting notes"
        error="Notes are limited to 500 characters."
      >
        <Textarea
          rows={3}
          defaultValue="Drake Navy Issue, shield PvE."
        />
      </Field>
      <Field
        id="s-disabled"
        label="Region"
        description="Sign in to filter by your region."
      >
        <Input
          defaultValue="The Forge"
          disabled
        />
      </Field>
      <Field
        id="s-readonly"
        label="Character id"
      >
        <Input
          defaultValue="2112625428"
          readOnly
        />
      </Field>
    </div>
  ),
}

const levels = (
  <Select defaultValue="90">
    <option>80</option>
    <option>90</option>
    <option>100</option>
  </Select>
)

// The control keeps its own width; help and error sit under the row.
export const Inline: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <div className="x-stack-lg">
      <Field
        id="i-select"
        label="Level"
        layout="inline"
      >
        {levels}
      </Field>
      <Field
        id="i-input"
        label="Build name"
        layout="inline"
      >
        <Input defaultValue="Righteous Fire Juggernaut" />
      </Field>
      <Field
        id="i-select-help"
        label="Level"
        layout="inline"
        description="The level the stats are worked out for."
      >
        {levels}
      </Field>
      <Field
        id="i-input-help"
        label="Build name"
        layout="inline"
        description="Shown in the build list."
      >
        <Input defaultValue="Righteous Fire Juggernaut" />
      </Field>
      <Field
        id="i-select-error"
        label="Level"
        layout="inline"
        description="The level the stats are worked out for."
        error="Pick a level from 1 to 100."
        required
      >
        <Select defaultValue="">
          <option
            value=""
            disabled
          >
            Pick
          </option>
          <option>90</option>
        </Select>
      </Field>
      <Field
        id="i-input-error"
        label="Build name"
        layout="inline"
        error="Give the build a name."
        required
      >
        <Input defaultValue="" />
      </Field>
    </div>
  ),
}
