// ref: https://github.com/ueberdosis/tiptap/blob/main/packages/suggestion/src/suggestion.ts
import { ReactRenderer, Editor as ReactEditor } from '@tiptap/react'
import { Editor, Range } from '@tiptap/core'
import { PluginKey } from 'prosemirror-state'
import Suggestion from '@tiptap/suggestion'
import { createPopup, PopupInstance } from '../../../helpers/popup'
import { MentionCommandsMenu, MentionCommandsMenuProps } from '../../../components/extensionViews'
import { PageItem } from '../../../components/extensionViews/MentionMenu/PagePanel'
import { PeopleItem } from '../../../components/extensionViews/MentionMenu/PeoplePanel'
import { meta } from './meta'
import { createExtension } from '../../common'
import { ExternalProps } from '../../../context'

const TRIGGER_CHAR = '@'

interface MenuItems {
  people: PeopleItem[]
  page: PageItem[]
}

export interface MentionCommandsOptions {
  externalProps: ExternalProps
}

export interface MentionCommandsAttributes {}

export const MentionCommands = createExtension<MentionCommandsOptions>({
  name: meta.name,

  addProseMirrorPlugins() {
    const filterMenuItemsByQuery = ({ query }: { query: string }): MenuItems => {
      const searchValue = (query ?? '').toLowerCase()
      const pages = this.options.externalProps.documentPages
      const domain = this.options.externalProps.domain
      const pagePath = (parentId: string | null | undefined, path: string[] = []): string[] => {
        const parent = pages.find(p => p.key === parentId)

        if (!parent) return path
        return pagePath(parent.parentId, [parent.title ?? 'Untitled', ...path])
      }
      return {
        people:
          this.options.externalProps.spaceMembers
            .filter(item => (item.name ?? '').toLowerCase().includes(searchValue))
            .map(item => ({
              name: item.name,
              domain: item.domain,
              avatar: item.avatar,
              command(editor: Editor, range: Range) {
                editor.chain().focus().deleteRange(range).setUserBlock(item.domain, item.name, item.avatar).run()
              }
            }))
            .slice(0, 5) ?? [],
        page:
          pages
            .filter(item => {
              if (searchValue) return (item.title ?? '').toLowerCase().includes(searchValue)
              return !item.parentId
            })
            .map(item => ({
              name: item.title ?? '',
              icon: item.icon,
              category: pagePath(item.parentId).join('/'),
              command(editor: Editor, range: Range) {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setPageLinkBlock(item.key, `/${domain}/${item.key}`, item.title, item.icon)
                  .run()
              }
            }))
            .slice(0, 5) ?? []
      }
    }

    return [
      Suggestion({
        pluginKey: new PluginKey('mention'),
        char: TRIGGER_CHAR,
        startOfLine: false,
        command: ({ editor, range, props }) => {
          props.command(editor, range)
        },
        editor: this.editor,
        items: filterMenuItemsByQuery as any,
        render: () => {
          let reactRenderer: ReactRenderer
          let popup: PopupInstance
          let activeCategory: MentionCommandsMenuProps['activeCategory'] = 'people'
          let activeIndex = 0

          const handleIndexChange = (category: MentionCommandsMenuProps['activeCategory'], index: number): void => {
            activeIndex = index
            activeCategory = category
            reactRenderer.updateProps({
              activeCategory: category,
              activeIndex: index
            })
          }

          return {
            onStart: props => {
              if (!this.editor.isEditable) return

              reactRenderer = new ReactRenderer(MentionCommandsMenu as any, {
                props,
                editor: props.editor as ReactEditor
              })

              popup = createPopup(props.clientRect!, reactRenderer.element as HTMLElement, 'bottom-start')
            },
            onUpdate: props => {
              if (!this.editor.isEditable) return

              reactRenderer?.updateProps(props)

              popup?.setProps({
                getReferenceClientRect: props.clientRect
              })
            },
            onKeyDown: ({ event }) => {
              if (!this.editor.isEditable) return false

              const key = event.key
              const moving = (category: MentionCommandsMenuProps['activeCategory'], index: number): void => {
                handleIndexChange(category, index)
                reactRenderer?.element
                  ?.getElementsByClassName(`mention-menu-${category}`)
                  [index]?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
              }

              if (activeCategory === 'people') {
                if (key === 'ArrowUp') {
                  return true
                }

                if (key === 'ArrowDown') {
                  moving('page', 0)
                  return true
                }

                if (key === 'ArrowRight') {
                  moving(
                    activeCategory,
                    Math.min(activeIndex + 1, reactRenderer.props.items[activeCategory].length - 1)
                  )
                  return true
                }

                if (key === 'ArrowLeft') {
                  moving(activeCategory, Math.max(activeIndex - 1, 0))
                  return true
                }
              }

              if (activeCategory === 'page') {
                if (key === 'ArrowUp') {
                  if (activeIndex === 0) {
                    moving('people', 0)
                  } else {
                    moving(activeCategory, Math.max(activeIndex - 1, 0))
                  }
                  return true
                }

                if (key === 'ArrowDown') {
                  moving(
                    activeCategory,
                    Math.min(activeIndex + 1, reactRenderer.props.items[activeCategory].length - 1)
                  )
                  return true
                }
              }

              if (key === 'Enter') {
                reactRenderer?.props.command(reactRenderer.props.items[activeCategory][activeIndex])
                handleIndexChange('people', 0)
                return true
              }

              return false
            },
            onExit: () => {
              if (!this.editor.isEditable) return
              popup?.destroy()
              reactRenderer?.destroy()
            }
          }
        }
      })
    ]
  }
})