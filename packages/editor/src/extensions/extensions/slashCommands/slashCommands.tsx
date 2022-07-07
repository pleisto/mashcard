import { ReactRenderer, Editor } from '@tiptap/react'
import { PluginKey, Plugin } from 'prosemirror-state'
import { Suggestion } from '@tiptap/suggestion'
import { createPopup, PopupInstance } from '../../../helpers/popup'
import { SlashMenu } from '../../../components/extensionViews'
import { getSuggestionItems, TYPE_ITEMS, getRecentItems } from './items'
import { MashcardEventBus, EventSubscribed, SlashMenuHide, SlashMenuKeyboardEventTrigger } from '@mashcard/schema'
import { addItemKey } from './recentItemsManager'
import { meta } from './meta'
import { createExtension } from '../../common'
import { findParagraphWrapper } from '../placeholder/findWrapper'

export const TRIGGER_CHAR = '/'
const ALLOW_SPACES = false
const PREFIX_SPACE = true
const START_OF_LINE = true

export interface SlashCommandsOptions {}
export interface SlashCommandsAttributes {}

const pluginKey = new PluginKey('slashMenu')

export const SlashCommands = createExtension<SlashCommandsOptions, SlashCommandsAttributes>({
  name: meta.name,

  addStorage() {
    return {
      triggered: false
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown: (view, event) => {
            const key = event.key

            if (key === TRIGGER_CHAR) {
              const $position = this.editor.state.selection.$from
              const text = $position.nodeBefore?.isText && $position.nodeBefore.text

              if (!text) this.storage.triggered = true
            }

            return false
          }
        }
      }),
      Suggestion({
        pluginKey,
        char: TRIGGER_CHAR,
        startOfLine: START_OF_LINE,
        allowSpaces: ALLOW_SPACES,
        prefixSpace: PREFIX_SPACE,
        allow: ({ editor }) => editor.isEditable && this.storage.triggered,
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
            this.storage.triggered = false
            popup?.destroy()
            reactRenderer?.destroy()
            hideListener?.unsubscribe()
          }

          return {
            onStart: props => {
              if (!this.editor.isEditable) return

              if (!this.storage.triggered) return

              // disable slash menu if it is inside a wrapper currently.
              const disabled = !!findParagraphWrapper(this.editor.state.selection.$anchor)
              if (disabled) return

              hideListener = MashcardEventBus.subscribe(SlashMenuHide, () => {
                exit()
              })

              reactRenderer = new ReactRenderer(SlashMenu, {
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
                MashcardEventBus.dispatch(SlashMenuKeyboardEventTrigger({ key }))
                return true
              }

              if (key === '=') {
                const state = pluginKey.getState(this.editor.view.state)

                if (state && state.query === '') {
                  MashcardEventBus.dispatch(SlashMenuKeyboardEventTrigger({ key }))
                  return true
                }
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
