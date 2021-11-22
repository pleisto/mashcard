import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { PageLink } from './PageLink/PageLink'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageLinkBlock: {
      /**
       * Set a page link block
       */
      setPageLinkBlock: (id: string, link: string, title: string | undefined, icon: string | null | undefined) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageLinkBlockOptions {}

export const PageLinkBlockExtension = Node.create<PageLinkBlockOptions>({
  name: 'pageLinkBlock',

  inline: true,

  group: 'inline',

  selectable: false,

  defaultOptions: {},

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
    return ReactNodeViewRenderer(PageLink)
  },

  addCommands() {
    return {
      setPageLinkBlock:
        (id, link, title, icon) =>
        ({ commands }) => {
          return commands.insertContent({
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
        }
    }
  }
})
