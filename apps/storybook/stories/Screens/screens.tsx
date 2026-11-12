import { Header } from '@xaroth.nl/design/react'

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
