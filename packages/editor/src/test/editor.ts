import { DeepPartial } from '@mashcard/active-support'
import { Editor } from '@tiptap/react'
import { merge } from 'lodash'

export interface MockEditorProps extends DeepPartial<Editor> {}

export const mockEditor = (editorProps?: MockEditorProps): Editor => {
  const editor = new Proxy(
    {
      state: {
        doc: {
          resolve() {
            return {}
          }
        },
        selection: {
          anchor: 1,
          from: 1,
          to: 1,
          $from: {
            depth: 0
          }
        }
      },
      view: {}
    } as any,
    {
      get(target, key: keyof MockEditorProps) {
        if (key === 'state') {
          return merge(target.state, editorProps?.state)
        }

        if (key === 'view') {
          return new Proxy(merge(target.view, editorProps?.view), {
            get(_target, _key: keyof MockEditorProps['view']) {
              if (_key in _target) return _target[_key]
              return () => editor
            }
          })
        }

        const commandsProxy = new Proxy(editorProps?.commands ?? {}, {
          get(_target, _key: keyof MockEditorProps['commands']) {
            if (_key in _target) {
              return (...args: any): any => {
                ;(_target[_key] as Function)(...args)
                return commandsProxy
              }
            }

            return () => commandsProxy
          }
        })

        if (key === 'chain') {
          return () => commandsProxy
        }

        if (key === 'commands') {
          return commandsProxy
        }

        if (key in (editorProps ?? {})) {
          return editorProps?.[key]
        }

        return () => editor
      }
    }
  ) as Editor

  return editor
}
