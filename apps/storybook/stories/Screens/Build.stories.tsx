import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DescriptionList,
  DescriptionListGroup,
  DescriptionListGroups,
  EmptyState,
  PageHead,
  Workspace,
} from '@xaroth.nl/design/react'
import { appHeader, screen } from './screens.tsx'

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

const tree = (
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

const panel = (
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

function Build() {
  return (
    <Workspace
      header={appHeader('build')}
      panel={panel}
      panelLabel="Stats"
    >
      <EmptyState
        icon={tree}
        title="Passive tree"
        headingLevel={2}
      >
        The tree is drawn here.
      </EmptyState>
    </Workspace>
  )
}

const meta = {
  title: 'Screens/Build',
  component: Build,
  ...screen,
  // Tags are read statically, so they cannot come from the spread. check-stories also runs these at phone width.
  tags: ['phone'],
} satisfies Meta<typeof Build>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Build' }
