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
    alias: ['h1'],
    desc: 'Big section heading',
    icon: <Icon name="rte-h1" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    }
  },
  {
    title: 'Heading 2',
    alias: ['h2'],
    desc: 'Medium section heading',
    icon: <Icon name="rte-h2" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    }
  },
  {
    title: 'Heading 3',
    alias: ['h3'],
    desc: 'Small section heading',
    icon: <Icon name="rte-h3" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    }
  },
  {
    title: 'Bulleted List',
    alias: ['bulletlist'],
    desc: 'Create a bulleted list',
    icon: <Icon name="list-unordered" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    }
  },
  {
    title: 'Numbered List',
    alias: ['numberlist'],
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
    alias: ['img', 'picture'],
    desc: 'Upload or embed with a link',
    icon: <Icon name="file-image" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setImageSection().run()
    }
  },
  {
    title: 'Table',
    desc: 'Creat a table in this page',
    icon: <Icon name="table" className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setTableBlock().run()
    }
  }
]

function filterMenuItemsByQuery(query: string): SlashCommandsMenuItem[] {
  return menuItems
    .filter(
      item =>
        item.title.toLowerCase().startsWith(query.toLowerCase()) ||
        item.alias?.some(name => name.toLowerCase().startsWith(query.toLowerCase()))
    )
    .slice(0, QUERY_LIMIT)
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
          let activeIndex = 0
          const handleIndexChange = (index: number): void => {
            activeIndex = index
            reactRenderer.updateProps({
              activeIndex: index
            })
          }

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
              const key = event.key
              const moving = (index: number): void => {
                handleIndexChange(index)
                reactRenderer.element
                  ?.getElementsByClassName('slash-menu-item')
                  [index]?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
              }

              if (key === 'ArrowUp') {
                moving((activeIndex + menuItems.length - 1) % menuItems.length)
                return true
              }

              if (key === 'ArrowDown') {
                moving((activeIndex + 1) % menuItems.length)
                return true
              }

              if (key === 'Enter') {
                reactRenderer.props.command(reactRenderer.props.items[activeIndex])
                handleIndexChange(0)
                return true
              }

              return false
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
