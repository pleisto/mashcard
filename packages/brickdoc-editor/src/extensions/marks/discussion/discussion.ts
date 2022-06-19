import { mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { uuid } from '@brickdoc/active-support'
import { BrickdocEventBus, DiscussionListToggle, DiscussionMarkActive } from '@brickdoc/schema'
import { MARK_CLASS_NAME, MARK_ID_ATTR_NAME, focusDiscussionMark } from '../../../helpers/discussion'
import { DiscussionAttributes, DiscussionOptions, meta } from './meta'
import { createMark } from '../../common'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    discussion: {
      setDiscussion: () => ReturnType
      removeDiscussion: (from: number, to: number) => ReturnType
    }
  }
}

const openDiscussionList = (markId: string | null): void => {
  BrickdocEventBus.dispatch(DiscussionListToggle({ visible: true }))
  if (!markId) return
  // wait for drawer open animation
  setTimeout(() => {
    BrickdocEventBus.dispatch(DiscussionMarkActive({ markId }))
  }, 300)
}

export const Discussion = createMark<DiscussionOptions, DiscussionAttributes>({
  name: meta.name,

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
        ({ commands, editor }) => {
          const markId = uuid()
          if (!editor.isActive(this.name)) {
            const isMarked = commands.setMark(this.name, { markId })

            if (!isMarked) return false
          }

          openDiscussionList(markId)

          return true
        },
      removeDiscussion:
        (from, to) =>
        ({ tr, dispatch }) => {
          dispatch?.(tr.removeMark(from, to, this.type))
          return true
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
              openDiscussionList(mark.getAttribute(MARK_ID_ATTR_NAME))
            }
            return false
          }
        }
      })
    ]
  }
})
