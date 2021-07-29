// ref: https://github.com/ueberdosis/tiptap/blob/main/packages/suggestion/src/suggestion.ts
import * as React from 'react'
import { ReactRenderer, Editor, Extension } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import { Icon } from '@brickdoc/design-system'
import { createPopup, PopupInstance } from '../helpers/popup'
import { SlashCommandsMenu, SlashCommandsMenuItem } from './SlashCommandsMenu'

const QUERY_LIMIT = 10
const TRIGGER_CHAR = '/'

const menuItems: SlashCommandsMenuItem[] = [
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
  },
  {
    title: 'PDF',
    desc: 'Embed a PDF',
    icon: <Icon name="file-pdf" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setPdfSection().run()
    }
  },
  {
    title: 'Image',
    desc: 'Upload or embed with a link',
    icon: <Icon name="file-image" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setImageSection().run()
    }
  }
]

function filterMenuItemsByQuery(query: string): SlashCommandsMenuItem[] {
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

          // TODO: make SlashCommandsMenu a controlled function component, and move its internal selectedIndex state here

          return {
            onStart: props => {
              reactRenderer = new ReactRenderer(SlashCommandsMenu as any, {
                props,
                editor: props.editor as Editor
              })

              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              popup = createPopup(props.clientRect!, reactRenderer.element)
            },
            onUpdate(props) {
              reactRenderer.updateProps(props)

              popup.setProps({
                getReferenceClientRect: props.clientRect
              })
            },
            onKeyDown({ event }) {
              return (reactRenderer.ref as SlashCommandsMenu).onKeyDown(event.key)
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
