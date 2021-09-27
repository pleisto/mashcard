import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { LinkBlock } from './LinkBlock'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linkBlock: {
      /**
       * Set a linkBlock
       */
      setLinkBlock: (position?: number) => ReturnType
    }
  }
}

export interface WebsiteMeta {
  url: string
  title?: string
  description?: string
  cover?: string | null
  icon?: string
}

export interface LinkBlockOptions {
  fetchWebsiteMeta: (url: string) => Promise<{ success: boolean; data: WebsiteMeta }>
}

export const LinkBlockExtension = Node.create<LinkBlockOptions>({
  name: 'linkBlock',

  defaultOptions: {
    fetchWebsiteMeta() {
      throw new Error('You need configure fetchWebsiteMeta if you want to enable LinkBlock')
    }
  },

  group: 'block',

  atom: true,

  selectable: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      link: {
        default: {
          type: 'LINK'
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'link-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['link-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkBlock)
  },

  addCommands() {
    return {
      setLinkBlock:
        (position?: number) =>
        ({ commands }) => {
          const content = { type: this.name }
          if (position) return commands.insertContentAt(position, content)
          return commands.insertContent(content)
        }
    }
  }
})
