import { ExtensionAttribute } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { gapClickHandler } from './gapClickHandler'
import { meta } from './meta'
import { createExtension } from '../../common'

export interface EventHandlerOptions {}
export interface EventHandlerAttributes {}

export const EventHandler = createExtension<EventHandlerOptions, ExtensionAttribute>({
  name: meta.name,

  addProseMirrorPlugins() {
    const editor = this.editor
    return [
      new Plugin({
        key: new PluginKey(meta.name),
        props: {
          handleClick(view, pos, event) {
            gapClickHandler(editor, view, pos, event)
            return false
          }
        }
      })
    ]
  }
})
