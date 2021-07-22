// ref: https://github.com/ueberdosis/tiptap/blob/main/packages/suggestion/src/suggestion.ts
import * as React from 'react'
import { Extension } from '@tiptap/core'
import { Editor, ReactRenderer } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import { Icon } from '@brickdoc/design-system'
import { createPopup, PopupInstance } from '../helpers/popup'
import { SlashCommandsMenu } from './SlashCommandsMenu'

const QUERY_LIMIT = 10
const TRIGGER_CHAR = '/'

export interface MenuItem {
  title: string
  desc: string
  icon: React.ReactNode
  command: ({ editor: Editor, range: Range }) => void
}

const menuItems: MenuItem[] = [
  {
    title: 'Heading 1',
    desc: 'Big section heading',
    icon: <Icon name="rte-h1" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    }
  },
  {
    title: 'Heading 2',
    desc: 'Medium section heading',
    icon: <Icon name="rte-h2" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    }
  },
  {
    title: 'Heading 3',
    desc: 'Small section heading',
    icon: <Icon name="rte-h3" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    }
  },
  {
    title: 'Bulleted List',
    desc: 'Create a bulleted list',
    icon: <Icon name="list-unordered" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    }
  },
  {
    title: 'Numbered List',
    desc: 'Create a list with numbering',
    icon: <Icon name="list-ordered" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
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
