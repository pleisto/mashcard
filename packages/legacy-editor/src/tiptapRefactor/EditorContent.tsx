import { FC, HTMLProps, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Editor } from '@tiptap/core'
import { NodePortal } from '@mashcard/editor'
import { Editor as ExtendEditor } from './Editor'

export interface EditorContentProps extends HTMLProps<HTMLDivElement> {
  editor: Editor | null
}

const containerMatcher = (container: Element) => (value: NodePortal) => value.container === container
const portalUpdater = (index: number, container: Element, child: ReactNode) => (portal: NodePortal, i: number) => {
  if (i === index) return { container, child }
  return portal
}

export const EditorContent: FC<EditorContentProps> = ({ editor, ...props }) => {
  const editorContentRef = useRef<HTMLDivElement>(null)
  // TODO: remove unused nodePortals
  const [nodePortals, setNodePortals] = useState<NodePortal[]>([])

  // initial editor content
  useEffect(() => {
    if (
      (editor?.isDestroyed ?? true) ||
      !editor?.options.element ||
      !editorContentRef.current ||
      editorContentRef.current.childNodes.length > 0
    )
      return

    const element = editorContentRef.current

    element.append(...Array.from(editor.options.element.childNodes))

    editor.setOptions({
      element
    })
    ;(editor as ExtendEditor).updatePortal = (container, child) => {
      setNodePortals(nodePortals => {
        const index = nodePortals.findIndex(containerMatcher(container))

        if (index >= 0) {
          return nodePortals.map(portalUpdater(index, container, child))
        } else {
          return [...nodePortals, { container, child }]
        }
      })
    }

    setTimeout(() => {
      editor.createNodeViews()
    })
  }, [editor])

  // umount
  useEffect(
    () => () => {
      if (!editor) return

      if (!editor.isDestroyed) {
        editor.view.setProps({
          nodeViews: {}
        })
      }

      ;(editor as ExtendEditor).updatePortal = undefined

      if (!editor.options.element.firstChild) return

      const newElement = document.createElement('div')

      newElement.append(...Array.from(editor.options.element.childNodes))

      editor.setOptions({
        element: newElement
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <>
      <div {...props} ref={editorContentRef} />
      {nodePortals.map(({ container, child }) => createPortal(child, container))}
    </>
  )
}
