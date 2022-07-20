import { Link as TiptapLink } from '@tiptap/extension-link'
import { meta, LinkOptions } from './meta'

export const LINK_CLASS_NAME = 'mashcard-link'

export const Link = TiptapLink.extend<LinkOptions>({
  name: meta.name,

  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes?.target
      },
      class: {
        default: this.options.HTMLAttributes?.class
      },
      type: {
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => ({ 'data-type': attributes.type })
      },
      pageId: {
        parseHTML: element => element.getAttribute('data-page-id'),
        renderHTML: attributes => ({ 'data-page-id': attributes.pageId })
      }
    }
  }
}).configure({
  HTMLAttributes: {
    class: LINK_CLASS_NAME
  }
})

export { LinkEdit } from './linkEdit'
