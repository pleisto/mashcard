import { Plugin, PluginKey } from 'prosemirror-state'
import { Extension } from '@tiptap/core'
import type { Node } from 'prosemirror-model'

const PLUGIN_NAME = 'sync'
const PLUGIN_KEY = new PluginKey(PLUGIN_NAME)

const THROTTLE_DURATION = 3000

const now = (): number => {
  return new Date().getTime()
}

export interface SyncCallback {
  onCommit: ({ node: Node }) => void
  onLoad: ({ parentId: String, schema: Schema }) => Node
}

// https://prosemirror.net/docs/ref/#state.PluginSpec
export const SyncExtension = Extension.create({
  name: PLUGIN_NAME,

  addProseMirrorPlugins() {
    const options: any = this.options
    const callback = options.callback

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
            const commitNow = (): void => {
              if (state.timer) {
                clearTimeout(state.timer)
              }
              callback.onCommit({ node: newState.doc })
            }
            if (state.syncTime && now() - state.syncTime < THROTTLE_DURATION) {
              if (state.timer) {
                return newPluginState
              }
              const timer = setTimeout(commitNow, THROTTLE_DURATION)
              return { ...newPluginState, timer }
            }

            commitNow()
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            return { ...newPluginState, doc: newState.doc, version: state.version + 1, syncTime: now() }
          }
        }
      })
    ]
  }
})
