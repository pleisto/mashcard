import { TaskItem as TiptapTaskItem } from '@tiptap/extension-task-item'
import { meta } from './meta'

export const TaskItem = TiptapTaskItem.extend({
  name: meta.name,
  content: 'paragraph list*'
})
