import { FC, forwardRef, HTMLProps, ReactNode, useEffect, useRef } from 'react'
import { Editor } from '@tiptap/core'
import { NodePortal, NodePortalContainer, useNodePortals } from '@mashcard/editor'
import { Editor as ExtendEditor } from './Editor'

export interface EditorContentProps extends HTMLProps<HTMLDivElement> {
  editor: Editor | null
}

const containerMatcher = (container: Element) => (value: NodePortal) => value.container === container
const portalUpdater = (index: number, container: Element, child: ReactNode) => (portal: NodePortal, i: number) => {
  if (i === index) return { container, child }
  return portal
}

const EditorContentInner = forwardRef<HTMLDivElement, EditorContentProps>(({ editor, ...props }, ref) => {
  const { setNodePortals } = useNodePortals()

  useEffect(() => {
    if (!editor) return
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
    ;(editor as ExtendEditor).removePortal = container => {
      setNodePortals(nodePortals => nodePortals.filter(portal => portal.container !== container))
    }
  }, [editor, setNodePortals])

  return <div {...props} ref={ref} />
})

export const EditorContent: FC<EditorContentProps> = ({ editor, ...props }) => {
  const editorContentRef = useRef<HTMLDivElement>(null)

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

    // // creates node view in async way
    // setTimeout(() => {
    //   editor.createNodeViews()
    // })
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
    <NodePortalContainer>
      <EditorContentInner editor={editor} {...props} ref={editorContentRef} />
    </NodePortalContainer>
  )
}
