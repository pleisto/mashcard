import { TaskList as TiptapTaskList } from '@tiptap/extension-task-list'
import { ReactNodeViewRenderer } from '../../../tiptapRefactor'
import { ListView } from '../../../components/blockViews'
import { meta } from './meta'

export const TaskList = TiptapTaskList.extend({
  name: meta.name,
  draggable: true,
  addNodeView() {
    return ReactNodeViewRenderer(ListView)
  }
})
