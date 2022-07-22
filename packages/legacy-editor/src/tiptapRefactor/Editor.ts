import { NodePortal } from '@mashcard/editor'
import { Editor as TiptapEditor } from '@tiptap/core'

export interface Editor extends TiptapEditor {
  updatePortal?: (nodePortal: NodePortal) => void
  removePortal?: (id: string) => void
}
