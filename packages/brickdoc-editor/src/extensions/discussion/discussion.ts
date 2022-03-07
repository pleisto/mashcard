import { Mark, mergeAttributes } from '@tiptap/core'
import { uuid } from '@brickdoc/active-support'
import { name } from './name'

const MARK_CLASS_NAME = 'brickdoc-discussion-mark'

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

  addAttributes() {
    return {
      markId: {
        parseHTML: element => element.getAttribute('mark-id'),
        renderHTML: attributes => {
          if (!attributes.markId) {
            return {}
          }

          return {
            'mark-id': attributes.markId
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
  }
})
