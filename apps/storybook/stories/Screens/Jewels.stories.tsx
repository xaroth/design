import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Breadcrumbs,
  Button,
  Dialog,
  EmptyState,
  Field,
  Grid,
  Input,
  ItemCard,
  PageHead,
  Progress,
  Radio,
  RadioGroup,
  Replacement,
  ReplacementList,
  Select,
  Table,
  Tabs,
  Tag,
  Textarea,
} from '@xaroth.nl/design/react'
import type { ReactNode } from 'react'
import type { Item } from '../ItemCard/items.ts'
import {
  becomes,
  conquerors,
  pastedJewel,
  rareJewel,
  results,
  seedRange,
  socket,
  sockets,
  timelessJewel,
  versions,
  wantable,
  wanted,
  type Result,
} from './jewels.ts'
import { placeholder, screen, TabbedBuild, tree } from './screens.tsx'

// Visible text stays short; screen readers also hear what the control acts on.
const named = (visible: string, hidden: string) => (
  <>
    {visible}
    <span className="x-visually-hidden"> {hidden}</span>
  </>
)

const onTree = (dialog: ReactNode) => (
  <TabbedBuild view="tree">
    {placeholder('Passive tree', 'The tree is drawn here.', tree)}
    {dialog}
  </TabbedBuild>
)

// --- Socket detail: opens from a click on an allocated socket on the tree.

const jewelActions = (
  <>
    <Button
      variant="secondary"
      size="sm"
    >
      {named('Replace', `jewel in ${socket}`)}
    </Button>
    <Button
      variant="tertiary"
      tone="danger"
      size="sm"
    >
      {named('Remove', `jewel from ${socket}`)}
    </Button>
  </>
)

const nodeChanges = (seed: number, headingId: string) => (
  <ReplacementList aria-labelledby={headingId}>
    {becomes(seed).map((change) => (
      <Replacement
        key={change.from}
        from={change.from}
        to={change.to}
        lines={change.lines}
        meta={
          (change.kind || change.allocated) && (
            <>
              {change.kind && <Tag>{change.kind}</Tag>}
              {change.allocated && <Tag>Allocated</Tag>}
            </>
          )
        }
      />
    ))}
  </ReplacementList>
)

const allocatedCount = (seed: number) => becomes(seed).filter((c) => c.allocated).length

function SocketDialog({ jewel }: { jewel?: Item }) {
  const timeless = jewel === timelessJewel
  return (
    <Dialog
      open
      onClose={() => {}}
      title={socket}
      size="md"
    >
      {jewel ? (
        <div className="x-stack-md">
          <ItemCard
            {...jewel}
            headingLevel={3}
          >
            {jewelActions}
          </ItemCard>
          {timeless && (
            <section className="x-stack-sm">
              <h3 id="socket-nodes">What nodes in radius become</h3>
              <p className="x-muted">
                Seed 4512, Doryani. {allocatedCount(4512)} of {becomes(4512).length} nodes are allocated.
              </p>
              {nodeChanges(4512, 'socket-nodes')}
              <Button
                variant="secondary"
                href="#timeless"
              >
                {named('Timeless search', `for ${socket}`)}
              </Button>
            </section>
          )}
        </div>
      ) : (
        <EmptyState
          title="No jewel"
          headingLevel={3}
          actions={
            <>
              <Button>{named('Paste jewel', `into ${socket}`)}</Button>
              <Button
                variant="secondary"
                href="#timeless"
              >
                {named('Timeless search', `for ${socket}`)}
              </Button>
            </>
          }
        >
          Paste a jewel copied in Path of Building or in the game, or find a timeless jewel seed for this socket.
        </EmptyState>
      )}
    </Dialog>
  )
}

const pasteDialog = (
  <Dialog
    open
    onClose={() => {}}
    title={`Paste jewel for ${socket}`}
    size="md"
    actions={
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Put in socket</Button>
      </>
    }
  >
    <Field
      id="jewel-text"
      label="Jewel text"
      description="In Path of Building, copy the jewel, then paste its text here."
    >
      <Textarea
        rows={9}
        defaultValue={pastedJewel}
      />
    </Field>
  </Dialog>
)

// --- Timeless search: from a socket, both ways. A jewel and seed give what each node becomes; wanted results give
// the seeds that have them, best first.

type Direction = 'seed' | 'wanted'

const options = (values: string[]) =>
  values.map((v) => (
    <option
      key={v}
      value={v}
    >
      {v}
    </option>
  ))

const jewelFields = (direction: Direction) => (
  <>
    <Field
      id={`${direction}-version`}
      label="Jewel"
    >
      <Select defaultValue="Glorious Vanity">{options(versions)}</Select>
    </Field>
    <Field
      id={`${direction}-conqueror`}
      label="Conqueror"
      description={direction === 'wanted' ? 'Only changes the keystone.' : undefined}
    >
      <Select defaultValue="Doryani">{options(direction === 'wanted' ? ['Any', ...conquerors] : conquerors)}</Select>
    </Field>
    <Field
      id={`${direction}-socket`}
      label="Socket"
    >
      <Select defaultValue={socket}>{options(sockets)}</Select>
    </Field>
  </>
)

const seedForm = (
  <form
    className="x-stack-md"
    aria-label="Seed"
  >
    {jewelFields('seed')}
    <Field
      id="seed-seed"
      label="Seed"
      description={`${seedRange.min} to ${seedRange.max}.`}
    >
      <Input
        type="number"
        min={seedRange.min}
        max={seedRange.max}
        defaultValue={4512}
      />
    </Field>
    <Button type="submit">Show nodes</Button>
  </form>
)

const wantedRows = (
  <div className="x-stack-md">
    {wanted.map((w, i) => (
      <div
        key={w.name}
        className="x-stack-xs"
      >
        <div className="x-cluster-sm">
          <h4>{w.name}</h4>
          <Tag>{w.kind}</Tag>
          <Button
            variant="tertiary"
            size="sm"
          >
            {named('Remove', w.name)}
          </Button>
        </div>
        <Grid>
          <div className="x-col-6 x-col--keep">
            <Field
              id={`wanted-${i}-weight`}
              label={named('Weight', `for ${w.name}`)}
            >
              <Input
                type="number"
                min={0}
                defaultValue={w.weight}
              />
            </Field>
          </div>
          <div className="x-col-6 x-col--keep">
            <Field
              id={`wanted-${i}-min`}
              label={named('Minimum', `for ${w.name}`)}
            >
              <Input
                type="number"
                min={0}
                defaultValue={w.min}
              />
            </Field>
          </div>
        </Grid>
      </div>
    ))}
  </div>
)

const wantedForm = (
  <form
    className="x-stack-md"
    aria-label="Wanted results"
  >
    {jewelFields('wanted')}
    <RadioGroup
      id="wanted-nodes"
      legend="Nodes"
    >
      <Radio
        name="wanted-nodes"
        value="all"
        defaultChecked
      >
        All in radius
      </Radio>
      <Radio
        name="wanted-nodes"
        value="allocated"
      >
        Allocated only
      </Radio>
    </RadioGroup>
    <section className="x-stack-sm">
      <h3>Wanted</h3>
      <p className="x-muted">
        A seed scores each wanted notable or stat times its weight. Minimum is the total it needs.
      </p>
      {wantedRows}
      <Field
        id="wanted-add"
        label="Add a notable or stat"
      >
        <Select defaultValue="">
          <option value="">Choose…</option>
          {options(wantable)}
        </Select>
      </Field>
      <Button
        variant="secondary"
        size="sm"
      >
        Add
      </Button>
    </section>
    <Button type="submit">Search seeds</Button>
  </form>
)

const useSeed = (seed: number) => (
  <Button
    variant="secondary"
    size="sm"
  >
    {named('Use', `seed ${seed} in ${socket}`)}
  </Button>
)

const resultTable = (rows: Result[], current?: number) => (
  <Table
    label="Seeds, best first"
    density="compact"
    columns={[
      { key: 'seed', label: 'Seed' },
      { key: 'score', label: 'Score', numeric: true },
      { key: 'gives', label: 'Gives' },
      { key: 'use', label: 'Action' },
    ]}
    rows={rows.map((r) => ({
      seed: (
        <span className="x-cluster-xs">
          <a
            href={`#seed-${r.seed}`}
            aria-current={r.seed === current ? 'true' : undefined}
          >
            <span className="x-visually-hidden">Show seed </span>
            {r.seed}
          </a>
          {r.seed === current && <Tag>Shown</Tag>}
        </span>
      ),
      score: r.score,
      gives: r.gives,
      use: useSeed(r.seed),
    }))}
  />
)

const seedNodes = (seed: number, put: boolean) => (
  <section className="x-stack-sm">
    <h3 id={`seed-${seed}-nodes`}>Seed {seed}: what nodes become</h3>
    <p className="x-muted">
      Glorious Vanity, Doryani. {becomes(seed).length} nodes in radius, {allocatedCount(seed)} allocated.
    </p>
    {nodeChanges(seed, `seed-${seed}-nodes`)}
    {put && <Button>{named('Put in socket', `Glorious Vanity seed ${seed} in ${socket}`)}</Button>}
  </section>
)

const searching = (
  <section className="x-stack-md">
    <h3>Searching</h3>
    <Progress
      label="Seeds searched"
      value={40}
      showValue
    />
    <p className="x-muted">3,160 of 7,901 seeds. 2 found so far.</p>
    <div>
      <Button variant="secondary">Cancel search</Button>
    </div>
    {resultTable(results.slice(0, 2))}
  </section>
)

const noSeed = (
  <EmptyState
    title="No seed gives all of these"
    headingLevel={3}
  >
    Lower a minimum, or count all nodes in radius instead of only allocated ones.
  </EmptyState>
)

const found = (
  <div className="x-stack-lg">
    <section className="x-stack-sm">
      <h3>{results.length} seeds</h3>
      {resultTable(results, 4512)}
    </section>
    {seedNodes(4512, true)}
  </div>
)

function TimelessSearch({ direction, children }: { direction: Direction; children: ReactNode }) {
  return (
    <TabbedBuild
      view="tree"
      scroll
    >
      <div className="x-p-md x-stack-md">
        <PageHead
          level={2}
          compact
          title="Timeless search"
          lead={socket}
          breadcrumbs={
            <Breadcrumbs
              label="Breadcrumb"
              items={[
                { label: 'Tree', href: '#tree' },
                { label: socket, href: '#socket' },
                { label: 'Timeless search' },
              ]}
            />
          }
        />
        <Tabs
          label="Search by"
          items={[
            { label: 'Seed to nodes', href: '#by-seed', current: direction === 'seed' },
            { label: 'Wanted to seeds', href: '#by-wanted', current: direction === 'wanted' },
          ]}
        />
        <Grid>
          <div className="x-col-4">{direction === 'seed' ? seedForm : wantedForm}</div>
          <div className="x-col-8">{children}</div>
        </Grid>
      </div>
    </TabbedBuild>
  )
}

const meta = {
  title: 'Screens/Jewels',
  component: SocketDialog,
  ...screen,
  // Tags are read statically, so they cannot come from the spread. check-stories also runs these at phone width.
  tags: ['phone'],
} satisfies Meta<typeof SocketDialog>

export default meta

type Story = StoryObj<typeof meta>

export const SocketEmpty: Story = {
  name: 'Socket: empty',
  render: () => onTree(<SocketDialog />),
}

export const SocketPaste: Story = {
  name: 'Socket: paste',
  render: () => onTree(pasteDialog),
}

export const SocketJewel: Story = {
  name: 'Socket: jewel',
  render: () => onTree(<SocketDialog jewel={rareJewel} />),
}

export const SocketTimeless: Story = {
  name: 'Socket: timeless jewel',
  render: () => onTree(<SocketDialog jewel={timelessJewel} />),
}

export const BySeed: Story = {
  name: 'Timeless: seed to nodes',
  render: () => <TimelessSearch direction="seed">{seedNodes(4512, true)}</TimelessSearch>,
}

export const ByWanted: Story = {
  name: 'Timeless: wanted to seeds',
  render: () => <TimelessSearch direction="wanted">{found}</TimelessSearch>,
}

export const Searching: Story = {
  name: 'Timeless: searching',
  render: () => <TimelessSearch direction="wanted">{searching}</TimelessSearch>,
}

export const NoSeed: Story = {
  name: 'Timeless: no seed found',
  render: () => <TimelessSearch direction="wanted">{noSeed}</TimelessSearch>,
}
