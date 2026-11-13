import { bem } from '../../bem.ts'

// An app screen that fills the viewport: a header, a main region that takes the rest, and a side panel. Only the
// panel scrolls; the main region clips, so content like a canvas handles its own panning.
const workspace = bem('x-workspace')

export type WorkspaceOptions = {
  /** The main region scrolls instead of clipping, for views that are not a canvas. */
  scroll?: boolean
  className?: string
}

export const workspaceClass = ({ scroll, className }: WorkspaceOptions = {}): string => workspace({ scroll }, className)

export const workspaceMainClass = (nav: boolean): string => workspace.el('main', { nav })

export const workspaceClasses = {
  header: workspace.el('header'),
  body: workspace.el('body'),
  main: workspace.el('main'),
  nav: workspace.el('nav'),
  view: workspace.el('view'),
  panel: workspace.el('panel'),
} as const

// The panel is a scroll container, so it takes focus: keyboard users can scroll it when it holds no focusable content.
export const workspacePanelAttrs = (label: string) => ({ 'aria-label': label, tabIndex: 0 })

// Same reason, for a main region that scrolls.
export const workspaceScrollAttrs = (scroll?: boolean) => (scroll ? { tabIndex: 0 } : {})
