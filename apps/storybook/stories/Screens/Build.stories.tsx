import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Button,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListGroups,
  Dialog,
  EmptyState,
  EquipmentSlot,
  EquipmentSlots,
  Field,
  Grid,
  ItemCard,
  ItemName,
  PageHead,
  Tabs,
  Textarea,
  Workspace,
} from '@xaroth.nl/design/react'
import type { ReactNode } from 'react'
import { equipment, pastedText, type Item } from '../ItemCard/items.ts'
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

const placeholder = (title: string, text: string, icon?: ReactNode) => (
  <EmptyState
    icon={icon}
    title={title}
    headingLevel={2}
  >
    {text}
  </EmptyState>
)

function Build() {
  return (
    <Workspace
      header={appHeader('build')}
      panel={panel}
      panelLabel="Stats"
    >
      {placeholder('Passive tree', 'The tree is drawn here.', tree)}
    </Workspace>
  )
}

type View = 'tree' | 'items' | 'skills'

const equipped = equipment.filter((e) => e.item).length

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
function TabbedBuild({ view, children }: { view: View; children: ReactNode }) {
  return (
    <Workspace
      header={appHeader('build')}
      nav={views(view)}
      scroll={view === 'items'}
      panel={panel}
      panelLabel="Stats"
    >
      {children}
    </Workspace>
  )
}

const pasteButton = (label = 'Paste item') => (
  <Button
    variant="secondary"
    size="sm"
  >
    {label}
  </Button>
)

const slotActions = (item?: Item) =>
  item ? (
    <>
      {pasteButton('Replace')}
      <Button
        variant="tertiary"
        size="sm"
      >
        Remove
      </Button>
    </>
  ) : (
    pasteButton()
  )

const summary = (
  <p className="x-muted">
    {equipped} of {equipment.length} slots equipped. Lines marked “not counted” are read but do not change the stats
    yet.
  </p>
)

const itemsGrid = (
  <div className="x-p-md x-stack-md">
    <h2 className="x-visually-hidden">Items</h2>
    {summary}
    <EquipmentSlots aria-label="Equipment">
      {equipment.map(({ slot, item }) => (
        <EquipmentSlot
          key={slot}
          label={slot}
          actions={slotActions(item)}
        >
          {item && (
            <ItemCard
              {...item}
              headingLevel={4}
            />
          )}
        </EquipmentSlot>
      ))}
    </EquipmentSlots>
  </div>
)

const pasteDialog = (slot: string) => (
  <Dialog
    open
    onClose={() => {}}
    title={`Paste item for ${slot}`}
    size="md"
    actions={
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Equip</Button>
      </>
    }
  >
    <Field
      id="item-text"
      label="Item text"
      description="In Path of Building, copy the item, then paste its text here."
    >
      <Textarea
        rows={9}
        defaultValue={pastedText}
      />
    </Field>
  </Dialog>
)

// The alternative: slots as rows, the chosen slot's item in full beside them. Empty slots can be chosen too.
const itemsListDetail = (current: string) => {
  const chosen = equipment.find((e) => e.slot === current)?.item
  return (
    <div className="x-p-md x-stack-md">
      <h2 className="x-visually-hidden">Items</h2>
      {summary}
      <Grid>
        <div className="x-col-5">
          <EquipmentSlots
            layout="list"
            aria-label="Equipment"
          >
            {equipment.map(({ slot, item }) => (
              <EquipmentSlot
                key={slot}
                label={slot}
                href={`#${slot}`}
                current={slot === current}
              >
                {item && <ItemName rarity={item.rarity}>{item.name}</ItemName>}
              </EquipmentSlot>
            ))}
          </EquipmentSlots>
        </div>
        <div className="x-col-7">
          <EquipmentSlots aria-label="Chosen slot">
            <EquipmentSlot
              label={current}
              actions={slotActions(chosen)}
            >
              {chosen && (
                <ItemCard
                  {...chosen}
                  headingLevel={4}
                />
              )}
            </EquipmentSlot>
          </EquipmentSlots>
        </div>
      </Grid>
    </div>
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

export const TreeTab: StoryObj<typeof meta> = {
  name: 'Tabs: tree',
  render: () => <TabbedBuild view="tree">{placeholder('Passive tree', 'The tree is drawn here.', tree)}</TabbedBuild>,
}

export const ItemsTab: StoryObj<typeof meta> = {
  name: 'Tabs: items',
  render: () => <TabbedBuild view="items">{itemsGrid}</TabbedBuild>,
}

export const ItemsPaste: StoryObj<typeof meta> = {
  name: 'Tabs: items, paste',
  render: () => (
    <TabbedBuild view="items">
      {itemsGrid}
      {pasteDialog('Ring 2')}
    </TabbedBuild>
  ),
}

export const SkillsTab: StoryObj<typeof meta> = {
  name: 'Tabs: skills',
  render: () => (
    <TabbedBuild view="skills">{placeholder('Skills', 'Skill gems and links come here later.')}</TabbedBuild>
  ),
}

export const ItemsListDetail: StoryObj<typeof meta> = {
  name: 'Alternative: items as list and detail',
  render: () => <TabbedBuild view="items">{itemsListDetail('Amulet')}</TabbedBuild>,
}

export const ItemsListDetailEmpty: StoryObj<typeof meta> = {
  name: 'Alternative: items as list and detail, empty slot',
  render: () => <TabbedBuild view="items">{itemsListDetail('Ring 2')}</TabbedBuild>,
}
