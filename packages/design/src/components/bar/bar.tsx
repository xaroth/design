import './bar.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import { barClass, barClasses as c, barNoticeAttrs } from './index.ts'

export type BarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Navigation, usually Tabs. Left on wide bars, under the fields on narrow ones. */
  start?: ReactNode
  /** Fields, right aligned. They wrap onto as many lines as they need. */
  end?: ReactNode
  /** One short message under the bar, announced politely when it appears or changes. */
  notice?: ReactNode
}

export function Bar({ start, end, notice, className, ...rest }: BarProps) {
  return (
    <div
      {...rest}
      className={barClass({ className })}
    >
      <div className={c.inner}>
        {start != null && <div className={c.start}>{start}</div>}
        {end != null && <div className={c.end}>{end}</div>}
      </div>
      <div
        className={c.notice}
        {...barNoticeAttrs}
      >
        {notice}
      </div>
    </div>
  )
}
