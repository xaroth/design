import { bem } from '../../bem.ts'

// An app screen that fills the viewport: a header, a main region that takes the rest, and a side panel. Only the
// panel scrolls; the main region clips, so content like a canvas handles its own panning.
const workspace = bem('x-workspace')

export const workspaceClass = ({ className }: { className?: string } = {}): string => workspace({}, className)

export const workspaceClasses = {
  header: workspace.el('header'),
  body: workspace.el('body'),
  main: workspace.el('main'),
  panel: workspace.el('panel'),
} as const

// The panel is a scroll container, so it takes focus: keyboard users can scroll it when it holds no focusable content.
export const workspacePanelAttrs = (label: string) => ({ 'aria-label': label, tabIndex: 0 })
