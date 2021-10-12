// ref: https://github.com/ueberdosis/tiptap/blob/main/packages/suggestion/src/suggestion.ts
import { ReactRenderer, Editor, Extension } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import { Icon } from '@brickdoc/design-system'
import { createPopup, PopupInstance } from '../helpers/popup'
import { SlashCommandsMenu, SlashCommandsMenuItem } from './SlashCommandsMenu'

const TRIGGER_CHAR = '/'

const menuItems: SlashCommandsMenuItem[] = [
  {
    key: 'h1',
    alias: ['h1', 'heading 1'],
    icon: <Icon.RteH1 className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    }
  },
  {
    key: 'h2',
    alias: ['h2', 'heading 2'],
    icon: <Icon.RteH2 className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    }
  },
  {
    key: 'h3',
    alias: ['h3', 'heading 3'],
    icon: <Icon.RteH3 className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    }
  },
  {
    key: 'h4',
    alias: ['h4', 'heading 4'],
    icon: <Icon.RteH4 className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
    }
  },
  {
    key: 'h5',
    alias: ['h5', 'heading 5'],
    icon: <Icon.RteH5 className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 5 }).run()
    }
  },
  {
    key: 'bulletlist',
    alias: ['bullet list'],
    icon: <Icon.ListUnordered className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).wrapInBrickList('bulletList').run()
    }
  },
  {
    key: 'orderedlist',
    alias: ['number list', 'numbered list', 'order list', 'ordered list'],
    icon: <Icon.ListOrdered className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).wrapInBrickList('orderedList').run()
    }
  },
  {
    key: 'pdf',
    icon: <Icon.FilePdf className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setPdfSection(range.from - 1)
        .run()
    }
  },
  {
    key: 'embed',
    icon: <Icon.BlockLevelLink className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setLinkBlock(range.from - 1)
        .run()
    }
  },
  {
    key: 'image',
    alias: ['img', 'picture'],
    icon: <Icon.FileImage className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setImageSection(range.from - 1)
        .run()
    }
  },
  {
    key: 'table',
    icon: <Icon.Table className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setTableBlock(range.from - 1)
        .run()
    }
  }
]

function filterMenuItemsByQuery(query: string): SlashCommandsMenuItem[] {
  return menuItems.filter(
    item =>
      item.key.toLowerCase().startsWith(query.toLowerCase()) || item.alias?.some(name => name.toLowerCase().startsWith(query.toLowerCase()))
  )
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
