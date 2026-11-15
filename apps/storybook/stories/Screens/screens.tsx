import {
  Bar,
  Button,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListGroups,
  EmptyState,
  Field,
  Header,
  Input,
  PageHead,
  Select,
  Tabs,
  Workspace,
} from '@xaroth.nl/design/react'
import type { ReactNode } from 'react'
import { equipment } from '../ItemCard/items.ts'

// Screens are tuned in the theme of the app they belong to, so the theme toolbar does not apply to them.
export const screen = {
  parameters: { layout: 'fullscreen' },
  globals: { theme: 'pbt' },
}

export const appHeader = (current?: string) => (
  <Header
    brand={<span>pbt</span>}
    brandHref="#"
    items={[
      { label: 'New build', href: '#new', current: current === 'new' },
      { label: 'Build', href: '#build', current: current === 'build' },
    ]}
  />
)

// The app header of the build screen: the app's own actions, no navigation.
export const buildHeader = (
  <Header
    brand={<span>pbt</span>}
    brandHref="#"
    actions={
      <>
        {['Export', 'Import', 'New build'].map((label) => (
          <Button
            key={label}
            variant="secondary"
            size="sm"
          >
            {label}
          </Button>
        ))}
      </>
    }
  />
)

export const resetNotice = 'Changing the ascendancy resets the 6 points spent on Deadeye.'

// The bar under the header: the build's views and the fields that define the build. `id` keeps ids unique when a
// page shows more than one.
export const buildBar = ({ notice, id = 'build' }: { notice?: string; id?: string } = {}) => (
  <Bar
    start={
      <Tabs
        label="Build views"
        items={[
          { label: 'Tree', href: '#tree', current: true },
          { label: 'Items', href: '#items', count: 9 },
          { label: 'Config', href: '#config' },
        ]}
      />
    }
    end={
      <>
        <Input
          aria-label="Build name"
          defaultValue="Lightning Arrow league start"
          size={22}
        />
        <Field
          id={`${id}-level`}
          label="Level"
          layout="inline"
        >
          <Input
            type="number"
            min={1}
            max={100}
            defaultValue={92}
            size={4}
          />
        </Field>
        <Select
          aria-label="Class"
          defaultValue="ranger"
        >
          <option value="ranger">Ranger</option>
          <option value="duelist">Duelist</option>
        </Select>
        <Select
          aria-label="Ascendancy"
          defaultValue="deadeye"
        >
          <option value="">No Ascendancy</option>
          <option value="deadeye">Deadeye</option>
          <option value="pathfinder">Pathfinder</option>
        </Select>
        <Select
          aria-label="Bloodline"
          defaultValue=""
        >
          <option value="">No Bloodline</option>
        </Select>
      </>
    }
    notice={notice}
  />
)

const better = (amount: string) => ({ amount, effect: 'better' as const })
const worse = (amount: string) => ({ amount, effect: 'worse' as const })

const stats = [
  {
    title: 'Attributes',
    items: [
      { term: 'Strength', value: '42', change: better('+10') },
      { term: 'Dexterity', value: '14' },
      { term: 'Intelligence', value: '14' },
    ],
  },
  {
    title: 'Offence',
    items: [
      { term: 'Total DPS', value: '1,284', change: better('+8.2%') },
      { term: 'Hit Damage', value: '412' },
      { term: 'Attack Speed', value: '1.31/s' },
      { term: 'Crit Chance', value: '5.0%' },
      { term: 'Accuracy', value: '87%' },
    ],
  },
  {
    title: 'Defences',
    items: [
      { term: 'Life', value: '1,140', change: better('+5') },
      { term: 'Energy Shield', value: '0' },
      { term: 'Armour', value: '880' },
      { term: 'Evasion', value: '312', change: worse('-24') },
      { term: 'Block Chance', value: '0%' },
    ],
  },
  {
    title: 'Resistances',
    items: [
      { term: 'Fire', value: '-60%' },
      { term: 'Cold', value: '-60%' },
      { term: 'Lightning', value: '-60%' },
      { term: 'Chaos', value: '-60%' },
    ],
  },
]

export const tree = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle
      cx="12"
      cy="5"
      r="2"
    />
    <circle
      cx="5"
      cy="19"
      r="2"
    />
    <circle
      cx="19"
      cy="19"
      r="2"
    />
    <path d="M11 7 6 17M13 7l5 10M7 19h10" />
  </svg>
)

export const panel = (
  <div className="x-p-md x-density-compact">
    <PageHead
      compact
      titleFocusable
      title="Marauder"
      lead="Level 1, 12 points left"
    />
    <DescriptionListGroups>
      {stats.map((group) => (
        <DescriptionListGroup
          key={group.title}
          title={group.title}
          level={2}
        >
          <DescriptionList
            layout="inline"
            striped
            items={group.items}
          />
        </DescriptionListGroup>
      ))}
    </DescriptionListGroups>
  </div>
)

export const placeholder = (title: string, text: string, icon?: ReactNode) => (
  <EmptyState
    icon={icon}
    title={title}
    headingLevel={2}
  >
    {text}
  </EmptyState>
)

export type View = 'tree' | 'items' | 'skills'

export const equipped = equipment.filter((e) => e.item).length

const views = (current: View) => (
  <Tabs
    label="Build views"
    items={[
      { label: 'Tree', href: '#tree', current: current === 'tree' },
      { label: 'Items', href: '#items', current: current === 'items', count: `${equipped}/${equipment.length}` },
      { label: 'Skills', href: '#skills', current: current === 'skills' },
    ]}
  />
)

// The tabs switch the main region; the header and the stats panel stay.
export function TabbedBuild({
  view,
  scroll = view === 'items',
  children,
}: {
  view: View
  /** For views that are not a canvas. */
  scroll?: boolean
  children: ReactNode
}) {
  return (
    <Workspace
      header={appHeader('build')}
      nav={views(view)}
      scroll={scroll}
      panel={panel}
      panelLabel="Stats"
    >
      {children}
    </Workspace>
  )
}
