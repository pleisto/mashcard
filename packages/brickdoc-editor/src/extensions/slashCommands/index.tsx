// ref: https://github.com/ueberdosis/tiptap/blob/main/packages/suggestion/src/suggestion.ts
import { ReactRenderer, Editor, Extension } from '@tiptap/react'
import { PluginKey } from 'prosemirror-state'
import Suggestion from '@tiptap/suggestion'
import { Icon } from '@brickdoc/design-system'
import { createPopup, PopupInstance } from '../../helpers/popup'
import { SlashMenu, SlashMenuItem } from '../../components'

const TRIGGER_CHAR = '/'

const menuItems: SlashMenuItem[] = [
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
    key: 'embed',
    icon: <Icon.PaperClip className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .setEmbedBlock(range.from - 1)
        .run()
    }
  },
  {
    key: 'divider',
    icon: <Icon.Divider className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    }
  },
  {
    key: 'toc',
    icon: <Icon.Toc className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setTocBlock().run()
    }
  },
  {
    key: 'subPageMenu',
    icon: <Icon.MindmapList className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setSubPageMenuBlock().run()
    }
  },
  {
    key: 'image',
    alias: ['img', 'picture'],
    icon: <Icon.FileImage className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .setImageBlock(range.from - 1)
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
        .splitBlock()
        .run()
    }
  },
  {
    key: 'formula',
    icon: <Icon.Formula className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setFormulaBlock().run()
    }
  },
  {
    key: 'code',
    icon: <Icon.Code className="menu-item-icon" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setCodeBlock().run()
    }
  }
]

function filterMenuItemsByQuery({ query }: { query: string }): SlashMenuItem[] {
  return menuItems.filter(
    item =>
      item.key.toLowerCase().startsWith(query.toLowerCase()) ||
      item.alias?.some(name => name.toLowerCase().startsWith(query.toLowerCase()))
  )
}

export const SlashCommandsExtension = Extension.create({
  name: 'slashCommands',

  addProseMirrorPlugins() {
    return [
      Suggestion({
        pluginKey: new PluginKey('slashMenu'),
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
              if (!this.editor.isEditable) return

              reactRenderer = new ReactRenderer(SlashMenu as any, {
                props,
                editor: props.editor as Editor
              })

              popup = createPopup(props.clientRect!, reactRenderer.element)
            },
            onUpdate: props => {
              if (!this.editor.isEditable) return

              reactRenderer?.updateProps(props)

              popup?.setProps({
                getReferenceClientRect: props.clientRect
              })
            },
            onKeyDown: ({ event }) => {
              if (!this.editor.isEditable) return false

              const key = event.key
              const moving = (index: number): void => {
                handleIndexChange(index)
                reactRenderer?.element
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
                reactRenderer?.props.command(reactRenderer.props.items[activeIndex])
                handleIndexChange(0)
                return true
              }

              return false
            },
            onExit: () => {
              if (!this.editor.isEditable) return
              popup?.destroy()
              reactRenderer?.destroy()
            }
          }
        }
      })
    ]
  }
})
