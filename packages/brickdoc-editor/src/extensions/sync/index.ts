import { Plugin, PluginKey } from 'prosemirror-state'
import { Extension } from '@tiptap/core'

const PLUGIN_NAME = 'sync'
const PLUGIN_KEY = new PluginKey(PLUGIN_NAME)

const THROTTLE_DURATION = 3000

const now = (): number => new Date().getTime()
export interface SyncHandler {
  onCommit: ({ node: any }) => void
}

// https://prosemirror.net/docs/ref/#state.PluginSpec
export const SyncExtension = Extension.create({
  name: PLUGIN_NAME,

  addProseMirrorPlugins() {
    const options: any = this.options
    const onSync = options.onSync

    return [
      new Plugin({
        key: PLUGIN_KEY,
        state: {
          init: (config, state) => ({
            version: 0,
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
            const doCommit = () => {
              onSync.onCommit({ node: newState.doc })
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
