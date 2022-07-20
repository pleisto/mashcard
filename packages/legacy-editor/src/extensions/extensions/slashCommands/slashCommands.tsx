import { Editor } from '@tiptap/core'
import { ReactRenderer } from '../../../tiptapRefactor'
import { PluginKey, Plugin } from 'prosemirror-state'
import { Suggestion } from '@tiptap/suggestion'
import { createPopup, PopupInstance } from '../../../helpers/popup'
import { SlashMenu, SlashMenuProps } from '../../../components/extensionViews'
import { MashcardEventBus, EventSubscribed, SlashMenuHide, SlashMenuKeyboardEventTrigger } from '@mashcard/schema'
import { meta } from './meta'
import { createExtension } from '../../common'
import { findParagraphWrapper } from '../placeholder/findWrapper'

export const TRIGGER_CHAR = '/'
const ALLOW_SPACES = false
const START_OF_LINE = false
const ALLOWED_PREFIXES = [' ']

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
              this.storage.triggered = true
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
        allowedPrefixes: ALLOWED_PREFIXES,
        allow: ({ editor }) => editor.isEditable && this.storage.triggered,
        editor: this.editor,
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

              const onBlockSelect: NonNullable<SlashMenuProps['onBlockSelect']> = item => {
                item.command({ editor: props.editor, range: props.range })
              }

              reactRenderer = new ReactRenderer(SlashMenu, {
                props: {
                  query: props.query,
                  onBlockSelect
                },
                editor: props.editor as Editor
              })

              popup = createPopup(() => props.clientRect!()!, reactRenderer.element as HTMLElement, 'bottom-start')
            },
            onUpdate: props => {
              if (!this.editor.isEditable) return

              const onBlockSelect: NonNullable<SlashMenuProps['onBlockSelect']> = item => {
                item.command({ editor: props.editor, range: props.range })
              }

              reactRenderer?.updateProps({
                query: props.query,
                onBlockSelect
              })

              popup?.setProps({
                getReferenceClientRect: () => props.clientRect!()!
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
