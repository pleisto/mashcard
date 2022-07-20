import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { LinkAttributes, LinkOptions, meta } from './meta'
import { createPopup } from '../../../helpers'
import { getAttributes, ReactRenderer } from '@tiptap/react'
import { InlineLinkDetail, InlineLinkDetailProps } from '../../../components/markViews'
import { createExtension } from '../../common'
import { Instance } from 'tippy.js'
import { Link } from './link'

const name = `${meta.name}-edit`

export const LinkEdit = createExtension<LinkOptions>({
  name,

  addProseMirrorPlugins() {
    const editor = this.editor

    let popup: Instance | null = null

    return [
      new Plugin({
        key: new PluginKey(name),
        props: {
          handleClick: (view, pos, event) => {
            const attrs = getAttributes(view.state, meta.name) as LinkAttributes
            const link = (event.target as HTMLElement)?.closest('a')

            if (link && attrs.type === 'page') {
              const extension = editor.extensionManager.extensions.find(
                extension => extension.name === meta.name
              ) as typeof Link
              const options = extension.options
              const page = options.pages?.find(page => page.id === attrs.pageId)
              if (page) options.onNavigate?.(page.href)

              return true
            }

            return false
          },
          handleDOMEvents: {
            mouseover(view, event) {
              if (!(event.target instanceof HTMLElement)) return false
              if (view.state.selection instanceof TextSelection && !view.state.selection.empty) return

              const link = event.target.closest('a')

              if (!link || popup?.state.isShown) return false
              const pos = view.posAtDOM(link, -1)
              const node = editor.state.doc.nodeAt(pos)

              if (!node) return false
              const clientRects = link.getBoundingClientRect()

              const handleLinkChange = (type: LinkAttributes['type'], linkOrPageId: string): void => {
                const node = editor.state.doc.nodeAt(pos)

                if (!node) return

                const from = pos
                const to = from + node.nodeSize
                editor
                  .chain()
                  .setTextSelection({ from, to })
                  .setLink({
                    type,
                    href: type === 'link' ? linkOrPageId : '',
                    pageId: type === 'page' ? linkOrPageId : '',
                    target: '_blank'
                    // TODO: fix this type, override setLink type
                  } as any)
                  .setTextSelection(to)
                  .run()

                reactRenderer.updateProps({
                  type,
                  href: type === 'link' ? linkOrPageId : '',
                  pageId: type === 'page' ? linkOrPageId : ''
                })
              }

              const handleUnsetLink = (): void => {
                const node = editor.state.doc.nodeAt(pos)

                if (!node) return

                const from = pos
                const to = from + node.nodeSize
                editor.chain().setTextSelection({ from, to }).unsetLink().setTextSelection(to).run()
              }

              const props: InlineLinkDetailProps = {
                type: (link.getAttribute('data-type') as InlineLinkDetailProps['type'] | null) ?? 'link',
                pageId: link.getAttribute('data-page-id'),
                onLinkChange: handleLinkChange,
                onUnsetLink: handleUnsetLink,
                link: link.href
              }

              const reactRenderer = new ReactRenderer(InlineLinkDetail, {
                editor,
                props
              })
              popup = createPopup(() => clientRects, reactRenderer.element as HTMLElement, 'bottom', {
                maxWidth: 960,
                delay: 500
              })

              return false
            },
            mouseout(view, event) {
              popup?.hideWithInteractivity(event)
              return false
            }
          }
        }
      })
    ]
  }
})
