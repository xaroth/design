import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Field, Header, Input, Select } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const brands = {
  xaroth: (
    <>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="18.5"
        />
        <circle
          cx="20"
          cy="20"
          r="11"
        />
        <path
          d="M20 1.5v37M1.5 20h37"
          strokeWidth="0.75"
        />
        <path
          d="M20 12l8 8-8 8-8-8z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
      <span>Xaroth</span>
    </>
  ),
  'eve-online': (
    <>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M16 2 28 9v14l-12 7-12-7V9z" />
        <path
          d="M16 8 23 12v8l-7 4-7-4v-8z"
          strokeOpacity="0.45"
        />
        <path
          d="M11 17.5 16 13l5 4.5"
          strokeWidth="2"
        />
      </svg>
      <span>eve-online.tools</span>
    </>
  ),
  text: <span>Site name</span>,
  none: undefined,
}

const actions = {
  none: undefined,
  'sign in': (
    <Button
      variant="secondary"
      size="sm"
      href="#signin"
    >
      Sign in
    </Button>
  ),
}

const meta = {
  title: 'Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  args: {
    layout: 'inline',
    sticky: false,
    brand: 'eve-online' as never,
    brandHref: '#',
    actions: 'sign in' as never,
    items: [
      { label: 'Home', href: '#', current: true },
      { label: 'Tools', href: '#tools' },
      { label: 'Blog', href: '#blog' },
      { label: 'About', href: '#about' },
      { label: 'Kit', href: '#kit' },
    ],
    navLabel: 'Main',
    menuLabel: 'Menu',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['inline', 'stacked'] },
    brand: { control: 'inline-radio', options: Object.keys(brands), mapping: brands },
    actions: { control: 'inline-radio', options: Object.keys(actions), mapping: actions },
    items: { control: 'object' },
    brandHref: { control: 'text' },
    brandLabel: { control: 'text' },
    navLabel: { control: 'text' },
    menuLabel: { control: 'text' },
  },
} satisfies Meta<typeof Header>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Header' }

const nav = (current?: string) =>
  ['Home', 'Tools', 'Blog', 'About'].map((label) => ({
    label,
    href: label === 'Home' ? '#' : `#${label.toLowerCase()}`,
    current: label === current,
  }))

// Headers stack with a gap so each bar reads as its own example.
export const Variants: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div className="x-py-xl">
      <Rows>
        {(['inline', 'stacked'] as const).flatMap((layout) =>
          (['eve-online', 'xaroth'] as const).map((brand) => (
            <Row
              key={`${layout}-${brand}`}
              label={`${layout}, ${brand} brand`}
              stack
              inset
            >
              <Header
                layout={layout}
                brand={brands[brand]}
                brandHref="#"
                items={nav('Home')}
                actions={actions['sign in']}
                navLabel={`Main, ${layout} ${brand}`}
              />
            </Row>
          )),
        )}
        <Row
          label="Text brand, no link, no actions"
          stack
          inset
        >
          <Header
            brand={brands.text}
            items={nav('Blog')}
            navLabel="Main, text brand"
          />
        </Row>
        <Row
          label="In a 480 px region: the nav folds by the bar's own width, at any viewport"
          stack
          inset
        >
          <div style={{ width: 480, outline: '1px dashed currentColor' }}>
            <Header
              brand={brands['eve-online']}
              brandHref="#"
              items={nav('Home')}
              actions={actions['sign in']}
              navLabel="Main, narrow region"
            />
          </div>
        </Row>
        <Row
          label="Brand and actions, no nav"
          stack
          inset
        >
          <Header
            brand={brands['eve-online']}
            brandHref="#"
            brandLabel="eve-online.tools home"
            actions={actions['sign in']}
          />
        </Row>
      </Rows>
    </div>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div className="x-py-xl">
      <Rows>
        {['Home', 'Blog', 'About', undefined].map((current) => (
          <Row
            key={current ?? 'none'}
            label={current ? `Current: ${current}` : 'No current page'}
            stack
            inset
          >
            <Header
              brand={brands['eve-online']}
              brandHref="#"
              items={nav(current)}
              navLabel={`Main, current ${current ?? 'none'}`}
            />
          </Row>
        ))}
      </Rows>
    </div>
  ),
}

// A text field and three selects, as a build page has them. Ids get a prefix so several headers can share a story.
const buildFields = (prefix: string) => (
  <>
    <Field
      id={`${prefix}-name`}
      label="Build"
      layout="inline"
    >
      <Input
        defaultValue="Righteous Fire"
        size={14}
      />
    </Field>
    <Field
      id={`${prefix}-class`}
      label="Class"
      layout="inline"
    >
      <Select defaultValue="Marauder">
        <option>Marauder</option>
        <option>Witch</option>
        <option>Ranger</option>
      </Select>
    </Field>
    <Field
      id={`${prefix}-ascendancy`}
      label="Ascendancy"
      layout="inline"
    >
      <Select defaultValue="Juggernaut">
        <option>None</option>
        <option>Juggernaut</option>
        <option>Berserker</option>
        <option>Chieftain</option>
      </Select>
    </Field>
    <Field
      id={`${prefix}-level`}
      label="Level"
      layout="inline"
    >
      <Select defaultValue="90">
        <option>1</option>
        <option>90</option>
        <option>100</option>
      </Select>
    </Field>
  </>
)

const notice = 'Stats are worked out for level 90.'

const withFields = (prefix: string, withNotice: boolean) => (
  <Header
    brand={brands.text}
    brandHref="#"
    fields={buildFields(prefix)}
    actions={actions['sign in']}
    notice={withNotice ? notice : undefined}
  />
)

// At desktop width the fields sit on the bar between the brand and the actions. Screens/Build adds a nav.
export const Fields: StoryObj<typeof meta> = {
  tags: ['phone'],
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div className="x-py-xl">
      <Rows>
        <Row
          label="Fields on the bar"
          stack
          inset
        >
          {withFields('wide', false)}
        </Row>
        <Row
          label="Fields on the bar, with a notice"
          stack
          inset
        >
          {withFields('wide-notice', true)}
        </Row>
      </Rows>
    </div>
  ),
}

// The bar is too narrow for the fields, so they move as a group to lines under it. Brand and actions stay.
export const FieldsNarrow: StoryObj<typeof meta> = {
  name: 'Fields, 390 px',
  tags: ['phone'],
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div className="x-py-xl">
      <Rows>
        {[false, true].map((withNotice) => (
          <Row
            key={String(withNotice)}
            label={withNotice ? 'In a 390 px region, with a notice' : 'In a 390 px region'}
            stack
            inset
          >
            <div style={{ width: 390, maxWidth: '100%', outline: '1px dashed currentColor' }}>
              {withFields(withNotice ? 'narrow-notice' : 'narrow', withNotice)}
            </div>
          </Row>
        ))}
      </Rows>
    </div>
  ),
}
