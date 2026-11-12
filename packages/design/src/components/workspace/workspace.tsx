import './workspace.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import { workspaceClass, workspaceClasses as c, workspacePanelAttrs } from './index.ts'

export type WorkspaceProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Usually a Header. */
  header?: ReactNode
  /** Content of the side panel. Beside the main region on wide screens, below it on narrow ones. */
  panel: ReactNode
  /** Accessible name of the side panel. */
  panelLabel: string
  /** Content of the main region. */
  children?: ReactNode
}

export function Workspace({ header, panel, panelLabel, className, children, ...rest }: WorkspaceProps) {
  return (
    <div
      {...rest}
      className={workspaceClass({ className })}
    >
      {header != null && <div className={c.header}>{header}</div>}
      <div className={c.body}>
        <main className={c.main}>{children}</main>
        <aside
          className={c.panel}
          {...workspacePanelAttrs(panelLabel)}
        >
          {panel}
        </aside>
      </div>
    </div>
  )
}
