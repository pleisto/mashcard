import { TaskList } from '@tiptap/extension-task-list'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: TaskList.name,
  extensionType: 'block'
}

export type { TaskListOptions } from '@tiptap/extension-task-list'
export interface TaskListAttributes {}
