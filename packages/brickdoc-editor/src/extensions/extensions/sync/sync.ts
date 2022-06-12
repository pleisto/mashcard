import { Plugin, PluginKey } from 'prosemirror-state'
import { JSONContent } from '@tiptap/core'
import { Node } from 'prosemirror-model'
import { SetDocAttrStep } from './SetDocAttrStep'
import { createExtension } from '../../common'
import { meta } from './meta'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sync: {
      setDocAttrs: (newAttrs: Record<string, any>) => ReturnType
      replaceRoot: (content: JSONContent) => ReturnType
    }
  }
}

export interface SyncOptions {
  onSave: (doc: Node) => void
  types: string[]
}

export interface SyncAttributes {}

const PLUGIN_KEY = new PluginKey(meta.name)

const THROTTLE_DURATION = 500

const now = (): number => new Date().getTime()

interface SyncPluginState {
  lastImmediateSaveTime?: number
  nextSaveTimer?: ReturnType<typeof setTimeout>
}

// https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/Extension.ts#L33
// https://github.com/naept/tiptap-extension-collaboration/blob/master/src/Collaboration.js#L10-L11
// https://prosemirror.net/docs/ref/#state.PluginSpec
export const Sync = createExtension<SyncOptions, SyncAttributes>({
  name: meta.name,

  addCommands() {
    return {
      setDocAttrs:
        newAttrs =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.step(new SetDocAttrStep(newAttrs))
          }
          return true
        },
      replaceRoot:
        content =>
        ({ chain, can, dispatch }) => {
          const chainedCommands = dispatch ? chain() : can().chain()
          return (
            chainedCommands
              // replaceRoot will not record in history because it is an initialization
              .setMeta('addToHistory', false)
              .setContent(content, false)
              .setDocAttrs(content.attrs ?? {})
              .run()
          )
        }
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          sort: {
            default: undefined,
            parseHTML: element => element.getAttribute(`data-sort`),
            renderHTML: attributes => {
              if (!attributes.sort) {
                return {}
              }

              return {
                [`data-sort`]: attributes.sort
              }
            }
          }
        }
      }
    ]
  },

  addProseMirrorPlugins() {
    const {
      options: { onSave },
      editor
    } = this

    return [
      new Plugin<SyncPluginState>({
        key: PLUGIN_KEY,
        state: {
          init: (config, state) => ({
            lastImmediateSaveTime: undefined,
            nextSaveTimer: undefined
          }),
          apply(tr, pluginState, oldState, newState) {
            // Clean up plugin states when `nextSaveTimer` triggered
            if (tr.getMeta('nextSaveTimerTriggered')) {
              return { ...pluginState, nextSaveTimer: undefined }
            }

            // Do nothing if the doc is not changed
            if (!tr.docChanged || tr.getMeta('preventUpdate')) {
              return pluginState
            }

            // When loading a new doc
            if (newState.doc.attrs.uuid !== oldState.doc.attrs.uuid) {
              // Clear pending sync timers if we are loading a new doc and save the old doc
              if (pluginState.nextSaveTimer) {
                clearTimeout(pluginState.nextSaveTimer)
                onSave(oldState.doc)
              }
              return { ...pluginState, lastImmediateSaveTime: undefined, nextSaveTimer: undefined }
            }

            // Delay triggering save if we are too close to the last immediate save
            if (pluginState.lastImmediateSaveTime && now() - pluginState.lastImmediateSaveTime < THROTTLE_DURATION) {
              if (pluginState.nextSaveTimer) {
                clearTimeout(pluginState.nextSaveTimer)
              }

              const timer = setTimeout(() => {
                onSave(newState.doc)
                editor.view.dispatch(newState.tr.setMeta('nextSaveTimerTriggered', true))
              }, THROTTLE_DURATION)
              return { ...pluginState, nextSaveTimer: timer }
            }

            // Otherwise, immediately trigger `onSave`
            onSave(newState.doc)
            if (pluginState.nextSaveTimer) {
              clearTimeout(pluginState.nextSaveTimer)
            }
            return { ...pluginState, lastImmediateSaveTime: now(), nextSaveTimer: undefined }
          }
        }
      })
    ]
  }
})
