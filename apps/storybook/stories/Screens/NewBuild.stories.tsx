import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, ChoiceCard, Container, PageHead, RadioGroup, Section } from '@xaroth.nl/design/react'
import { appHeader, screen } from './screens.tsx'

const classes = [
  { id: 'marauder', name: 'Marauder', str: 32, dex: 14, int: 14 },
  { id: 'duelist', name: 'Duelist', str: 23, dex: 23, int: 14 },
  { id: 'ranger', name: 'Ranger', str: 14, dex: 32, int: 14 },
  { id: 'shadow', name: 'Shadow', str: 14, dex: 23, int: 23 },
  { id: 'witch', name: 'Witch', str: 14, dex: 14, int: 32 },
  { id: 'templar', name: 'Templar', str: 23, dex: 14, int: 23 },
  { id: 'scion', name: 'Scion', str: 20, dex: 20, int: 20 },
]

function NewBuild() {
  return (
    <>
      {appHeader('new')}
      <Section as="div">
        <Container as="main">
          <form className="x-stack-xl">
            <PageHead
              title="New build"
              lead="Pick the class the build starts from."
            />
            <RadioGroup
              id="class"
              legend="Class"
              orientation="horizontal"
            >
              {classes.map((c, i) => (
                <ChoiceCard
                  key={c.id}
                  id={`class-${c.id}`}
                  name="class"
                  value={c.id}
                  title={c.name}
                  defaultChecked={i === 0}
                >
                  Str {c.str}, Dex {c.dex}, Int {c.int}
                </ChoiceCard>
              ))}
            </RadioGroup>
            <div>
              <Button type="submit">Start build</Button>
            </div>
          </form>
        </Container>
      </Section>
    </>
  )
}

const meta = {
  title: 'Screens/New build',
  component: NewBuild,
  ...screen,
  // Tags are read statically, so they cannot come from the spread. check-stories also runs these at phone width.
  tags: ['phone'],
} satisfies Meta<typeof NewBuild>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'New build' }
