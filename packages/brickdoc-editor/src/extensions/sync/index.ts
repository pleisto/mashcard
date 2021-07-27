import { Plugin, PluginKey } from 'prosemirror-state'
import { Extension, JSONContent } from '@tiptap/core'
import { Node } from 'prosemirror-model'
import { SetDocAttrStep } from './SetDocAttrStep'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sync: {
      setDocAttrs: (newAttrs: Record<string, any>) => ReturnType
      replaceRoot: (content: JSONContent) => ReturnType
    }
  }
}

export interface SyncExtensionOptions {
  onCommit: (doc: Node) => void
}

const PLUGIN_NAME = 'sync'
const PLUGIN_KEY = new PluginKey(PLUGIN_NAME)

const THROTTLE_DURATION = 3000

const now = (): number => new Date().getTime()

// https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/Extension.ts#L33
// https://github.com/naept/tiptap-extension-collaboration/blob/master/src/Collaboration.js#L10-L11
// https://prosemirror.net/docs/ref/#state.PluginSpec
export const SyncExtension = Extension.create<SyncExtensionOptions>({
  name: PLUGIN_NAME,

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
          return chainedCommands
            .setContent(content)
            .setDocAttrs(content.attrs ?? {})
            .run()
        }
    }
  },

  addProseMirrorPlugins() {
    const { onCommit } = this.options

    return [
      new Plugin({
        key: PLUGIN_KEY,
        state: {
          init: (config, state) => ({
            version: 0,
            patchSeq: 0,
            doc: state.doc,
            syncTime: null,
            editTime: null,
            timer: null
          }),
          apply(tr, state, oldState, newState) {
            if (!tr.docChanged) {
              return state
            }
            const newPluginState = { ...state, editTime: now() }
            const doCommit = (): void => {
              onCommit(newState.doc)
            }
            if (state.syncTime && now() - state.syncTime < THROTTLE_DURATION) {
              if (state.timer) {
                clearTimeout(state.timer)
              }

              const timer = setTimeout(doCommit, THROTTLE_DURATION)
              return { ...newPluginState, timer }
            }

            doCommit()
            return { ...newPluginState, doc: newState.doc, version: (state.version as number) + 1, syncTime: now() }
          }
        }
      })
    ]
  }
})
