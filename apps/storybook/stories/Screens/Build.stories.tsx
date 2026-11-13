import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Button,
  Dialog,
  EquipmentSlot,
  EquipmentSlots,
  Field,
  Grid,
  ItemCard,
  ItemName,
  Textarea,
  Workspace,
} from '@xaroth.nl/design/react'
import { equipment, pastedText, type Item } from '../ItemCard/items.ts'
import { appHeader, equipped, panel, placeholder, screen, TabbedBuild, tree } from './screens.tsx'

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
