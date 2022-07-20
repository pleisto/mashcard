import { Editor as TiptapEditor } from '@tiptap/core'
import { ReactNode } from 'react'

export interface Editor extends TiptapEditor {
  updatePortal?: (container: Element, child: ReactNode) => void
  removePortal: (container: Element) => void
}
