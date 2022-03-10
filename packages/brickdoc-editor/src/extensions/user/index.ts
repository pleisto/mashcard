import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { UserBlock } from '../../components'
import { name } from './name'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    userBlock: {
      /**
       * Set a user block
       */
      setUserBlock: (domain: string, name: string | null | undefined, avatarUrl: string | undefined) => ReturnType
    }
  }
}

export interface UserBlockOptions {
  size?: 'sm' | 'md'
}

export const UserBlockExtension = Node.create<UserBlockOptions>({
  name,

  inline: true,

  group: 'inline',

  selectable: false,

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
    return ReactNodeViewRenderer(UserBlock)
  },

  addCommands() {
    return {
      setUserBlock:
        (domain, name, avatarUrl) =>
        ({ chain }) => {
          return chain()
            .insertBlockAt({
              type: this.name,
              attrs: {
                people: {
                  type: 'PEOPLE',
                  domain,
                  name,
                  avatarUrl
                }
              }
            })
            .run()
        }
    }
  }
})
