import { Extension } from '@tiptap/core'
import { yCursorPlugin } from 'y-prosemirror'
import { CursorAvatar } from './styles'
import { string2Color } from '@brickdoc/design-system/src/components/Avatar/initials'
import * as ReactDOM from 'react-dom/client'

interface CollaborationCursorUsers extends Array<{ clientId: number; [key: string]: any }> {}

interface CollaborationCursorStorage {
  users: CollaborationCursorUsers
}

export interface CollaborationCursorOptions {
  provider: any
  user: Record<string, any>
  render: (user: Record<string, any>) => HTMLElement
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    collaborationCursor: {
      /**
       * Update details of the current user
       */
      updateUser: (attributes: Record<string, any>) => ReturnType
    }
  }
}

const awarenessStatesToArray = (states: Map<number, Record<string, any>>): CollaborationCursorUsers => {
  return Array.from(states.entries()).map(([key, value]) => {
    return {
      clientId: key,
      ...value.user
    }
  })
}

const defaultOnUpdate = (): void => {}

export const CollaborationCursor = Extension.create<CollaborationCursorOptions, CollaborationCursorStorage>({
  name: 'collaborationCursor',

  addOptions() {
    return {
      provider: null,
      user: {
        name: null,
        color: null
      },
      render: user => {
        const color = string2Color(user.operatorId)

        const cursor = document.createElement('span')

        cursor.classList.add('collaboration-cursor__caret')
        cursor.setAttribute('style', `border-color: ${color}`)

        const label = document.createElement('div')

        label.classList.add('collaboration-cursor__label')
        label.setAttribute('style', `background-color: ${color}`)

        const avatarElm = document.createElement('span')
        const avatarRoot = ReactDOM.createRoot(avatarElm)
        const avatar = <CursorAvatar size="xxs" initials={user.name} />

        avatarRoot.render(avatar)
        label.insertBefore(avatarElm, null)

        label.insertBefore(document.createTextNode(user.name), null)
        cursor.insertBefore(label, null)

        return cursor
      },
      onUpdate: defaultOnUpdate
    }
  },

  addStorage() {
    return {
      users: []
    }
  },

  addCommands() {
    return {
      updateUser: attributes => () => {
        this.options.user = attributes

        this.options.provider.awareness.setLocalStateField('user', this.options.user)

        return true
      }
    }
  },

  addProseMirrorPlugins() {
    return [
      yCursorPlugin(
        (() => {
          this.options.provider.awareness.setLocalStateField('user', this.options.user)

          this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states)

          this.options.provider.awareness.on('update', () => {
            this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states)
          })

          return this.options.provider.awareness
        })(),
        // eslint-disable-next-line
        // @ts-ignore
        {
          cursorBuilder: this.options.render
        }
      )
    ]
  }
})
