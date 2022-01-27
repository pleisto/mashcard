import { ReactRenderer, Editor, Extension, findParentNode } from '@tiptap/react'
import { PluginKey } from 'prosemirror-state'
import Suggestion from '@tiptap/suggestion'
import { createPopup, PopupInstance } from '../../helpers/popup'
import { SlashMenu } from '../../components'
import { getSuggestionItems, TYPE_ITEMS, getRecentItems } from './items'
import { BrickdocEventBus, EventSubscribed, SlashMenuHide, SlashMenuKeyboardEventTrigger } from '@brickdoc/schema'
import { addItemKey } from './recentItemsManager'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'

const TRIGGER_CHAR = '/'

export const SlashCommandsExtension = Extension.create({
  name: 'slashCommands',

  addProseMirrorPlugins() {
    return [
      Suggestion({
        pluginKey: new PluginKey('slashMenu'),
        char: TRIGGER_CHAR,
        startOfLine: true,
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
          addItemKey(props.key)
        },
        editor: this.editor,
        items: ({ query }) =>
          ({
            query,
            recent: getRecentItems(),
            suggestion: getSuggestionItems(query),
            type: TYPE_ITEMS
          } as any),
        render: () => {
          let reactRenderer: ReactRenderer
          let popup: PopupInstance
          let hideListener: EventSubscribed

          const exit = (): void => {
            if (!this.editor.isEditable) return
            popup?.destroy()
            reactRenderer?.destroy()
            hideListener?.unsubscribe()
          }

          return {
            onStart: props => {
              if (!this.editor.isEditable) return

              // disable slash menu if it is inside list currently.
              const insideList = !!findParentNode(
                node => node.type.name === BulletList.name || node.type.name === OrderedList.name
              )(this.editor.state.selection)?.node
              if (insideList) return

              hideListener = BrickdocEventBus.subscribe(SlashMenuHide, () => {
                exit()
              })

              reactRenderer = new ReactRenderer(SlashMenu as any, {
                props,
                editor: props.editor as Editor
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

              if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter' || key === 'Escape') {
                BrickdocEventBus.dispatch(SlashMenuKeyboardEventTrigger({ key }))
                return true
              }

              return false
            },
            onExit: () => {
              exit()
            }
          }
        }
      })
    ]
  }
})
