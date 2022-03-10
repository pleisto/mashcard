import { Mark, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { uuid } from '@brickdoc/active-support'
import { BrickdocEventBus, DiscussionListToggle, DiscussionMarkActive } from '@brickdoc/schema'
import { MARK_CLASS_NAME, MARK_ID_ATTR_NAME, focusDiscussionMark } from '../../helpers/discussion'
import { name } from './name'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    discussion: {
      setDiscussion: () => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DiscussionOptions {}

export const DiscussionMark = Mark.create<DiscussionOptions>({
  name,

  // check for focused discussion mark
  onSelectionUpdate() {
    const node = this.editor.view.domAtPos(this.editor.state.selection.anchor).node
    focusDiscussionMark(node)
  },

  addAttributes() {
    return {
      markId: {
        parseHTML: element => element.getAttribute(MARK_ID_ATTR_NAME),
        renderHTML: attributes => {
          if (!attributes.markId) {
            return {}
          }

          return {
            [MARK_ID_ATTR_NAME]: attributes.markId
          }
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
        getAttrs: node => (node as HTMLElement).classList.contains(MARK_CLASS_NAME) && null
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes({ class: MARK_CLASS_NAME }, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setDiscussion:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name, { markId: uuid() })
        }
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('discussionMarkEvents'),
        props: {
          handleClick: (view, pos, event) => {
            // check if click event occurred on discussion mark
            const mark = (event.target as HTMLElement)?.closest('mark')
            if (mark?.classList.contains(MARK_CLASS_NAME)) {
              BrickdocEventBus.dispatch(DiscussionListToggle({ visible: true }))
              // wait for drawer open animation
              setTimeout(() => {
                BrickdocEventBus.dispatch(DiscussionMarkActive({ markId: mark.getAttribute(MARK_ID_ATTR_NAME) }))
              }, 200)
            }
            return false
          }
        }
      })
    ]
  }
})
