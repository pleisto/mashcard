import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { PageLinkBlock } from '../../components'
import { name } from './name'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageLinkBlock: {
      /**
       * Set a page link block
       */
      setPageLinkBlock: (
        id: string,
        link: string,
        title: string | undefined,
        icon: string | null | undefined
      ) => ReturnType
    }
  }
}

export interface PageLinkBlockOptions {
  size?: 'sm' | 'md'
}

export const PageLinkBlockExtension = Node.create<PageLinkBlockOptions>({
  name,

  inline: true,

  group: 'inline',

  selectable: false,

  addAttributes() {
    return {
      page: {
        default: {
          type: 'PAGE'
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'page-link-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['user-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(PageLinkBlock)
  },

  addCommands() {
    return {
      setPageLinkBlock:
        (id, link, title, icon) =>
        ({ chain }) => {
          return chain()
            .insertBlockAt({
              type: this.name,
              attrs: {
                page: {
                  type: 'PAGE',
                  key: id,
                  title,
                  link,
                  icon
                }
              }
            })
            .run()
        }
    }
  }
})
