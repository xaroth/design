// @vitest-environment happy-dom
import { act, createElement, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { Modal } from '../../react.ts'

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })

const mount = async (node: ReturnType<typeof createElement>) => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = createRoot(host)
  await act(async () => root.render(node))
  return async () => {
    await act(async () => root.unmount())
    host.remove()
  }
}

it('a cancel from a nested dialog does not close the outer one', async () => {
  const outerClose = vi.fn()
  const innerClose = vi.fn()
  const unmount = await mount(
    createElement(
      Modal,
      { open: true, onClose: outerClose, id: 'outer' },
      createElement(Modal, { open: true, onClose: innerClose, id: 'inner' }),
    ),
  )

  const inner = document.getElementById('inner') as HTMLDialogElement
  await act(async () => {
    inner.dispatchEvent(new Event('cancel', { cancelable: true }))
  })

  expect(innerClose).toHaveBeenCalledTimes(1)
  expect(outerClose).not.toHaveBeenCalled()

  await act(async () => {
    inner.dispatchEvent(new Event('close'))
  })
  expect(outerClose).not.toHaveBeenCalled()
  await unmount()
})

it('closing returns focus to the element that opened it', async () => {
  function Host() {
    const [open, setOpen] = useState(false)
    return createElement(
      'div',
      null,
      createElement('button', { id: 'opener', onClick: () => setOpen(true) }, 'Open'),
      createElement(Modal, { open, onClose: () => setOpen(false), id: 'm' }, createElement('p', null, 'Body')),
    )
  }
  const unmount = await mount(createElement(Host))
  const opener = document.getElementById('opener') as HTMLButtonElement

  opener.focus()
  await act(async () => opener.click())
  expect((document.getElementById('m') as HTMLDialogElement).open).toBe(true)

  // Focus has left the opener while the dialog was open and the browser does not restore it.
  opener.blur()
  ;(document.getElementById('m') as HTMLDialogElement).dispatchEvent(new Event('cancel', { cancelable: true }))
  await act(async () => {})
  expect((document.getElementById('m') as HTMLDialogElement).open).toBe(false)
  expect(document.activeElement).toBe(opener)
  await unmount()
})
