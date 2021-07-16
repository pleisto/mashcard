// ref: https://github.com/ueberdosis/tiptap/blob/main/packages/suggestion/src/suggestion.ts
import { Extension } from '@tiptap/core'
import { Editor, ReactRenderer } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import { createPopup, PopupInstance } from '../helpers/popup'
import SlashCommandsMenu from './SlashCommandsMenu'

const QUERY_LIMIT = 10
const TRIGGER_CHAR = '/'

export interface MenuItem {
  title: string
  command: ({ editor: Editor, range: Range }) => void
}

// TODO: menu items should be passed in from outside
const menuItems: MenuItem[] = [
  {
    title: 'H1',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    }
  },
  {
    title: 'H2',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    }
  },
  {
    title: 'Bullet List',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    }
  }
]

function filterMenuItemsByQuery(query: string): MenuItem[] {
  return menuItems.filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, QUERY_LIMIT)
}

export const SlashCommandsExtension = Extension.create({
  name: 'slashCommands',

  addProseMirrorPlugins() {
    return [
      Suggestion({
        char: TRIGGER_CHAR,
        startOfLine: true,
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        editor: this.editor,
        items: filterMenuItemsByQuery,
        render: () => {
          let reactRenderer: ReactRenderer
          let popup: PopupInstance

          return {
            onStart: props => {
              reactRenderer = new ReactRenderer(SlashCommandsMenu as any, {
                props,
                editor: props.editor as Editor
              })

              popup = createPopup(props.clientRect, reactRenderer.element)
            },
            onUpdate(props) {
              reactRenderer.updateProps(props)

              popup.setProps({
                getReferenceClientRect: props.clientRect
              })
            },
            onKeyDown(props) {
              return (reactRenderer.ref as any).onKeyDown(props)
            },
            onExit() {
              popup.destroy()
              reactRenderer.destroy()
            }
          }
        }
      })
    ]
  }
})
