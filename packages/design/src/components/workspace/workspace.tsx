import './workspace.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  workspaceClass,
  workspaceClasses as c,
  workspaceMainClass,
  workspacePanelAttrs,
  workspaceScrollAttrs,
  type WorkspaceOptions,
} from './index.ts'

export type WorkspaceProps = Omit<WorkspaceOptions, 'className'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** Usually a Header. */
    header?: ReactNode
    /** Above the main region, usually Tabs that switch what it shows. The panel stays. */
    nav?: ReactNode
    /** Content of the side panel. Beside the main region on wide screens, below it on narrow ones. */
    panel: ReactNode
    /** Accessible name of the side panel. */
    panelLabel: string
    /** Content of the main region. */
    children?: ReactNode
  }

export function Workspace({ header, nav, panel, panelLabel, scroll, className, children, ...rest }: WorkspaceProps) {
  return (
    <div
      {...rest}
      className={workspaceClass({ scroll, className })}
    >
      {header != null && <div className={c.header}>{header}</div>}
      <div className={c.body}>
        <main
          className={workspaceMainClass(nav != null)}
          {...workspaceScrollAttrs(scroll && nav == null)}
        >
          {nav != null ? (
            <>
              <div className={c.nav}>{nav}</div>
              <div
                className={c.view}
                {...workspaceScrollAttrs(scroll)}
              >
                {children}
              </div>
            </>
          ) : (
            children
          )}
        </main>
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
