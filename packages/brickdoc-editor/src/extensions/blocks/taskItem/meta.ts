import { TaskItem } from '@tiptap/extension-task-item'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: TaskItem.name,
  extensionType: 'block'
}

export type { TaskItemOptions } from '@tiptap/extension-task-item'
export interface TaskItemAttributes {}
