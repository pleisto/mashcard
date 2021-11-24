import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { insertBlockAt } from '../helpers/commands'
import { User } from './User/User'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    userBlock: {
      /**
       * Set a user block
       */
      setUserBlock: (webid: string, name: string | null | undefined, avatarUrl: string | undefined) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserBlockOptions {}

export const UserBlockExtension = Node.create<UserBlockOptions>({
  name: 'userBlock',

  inline: true,

  group: 'inline',

  selectable: false,

  defaultOptions: {},

  addAttributes() {
    return {
      people: {
        default: {
          type: 'PEOPLE'
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'user-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['user-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(User)
  },

  addCommands() {
    return {
      setUserBlock:
        (webid, name, avatarUrl) =>
        ({ chain }) => {
          return insertBlockAt(
            {
              type: this.name,
              attrs: {
                people: {
                  type: 'PEOPLE',
                  webid,
                  name,
                  avatarUrl
                }
              }
            },
            chain
          )
        }
    }
  }
})
