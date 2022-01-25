import React from 'react'
import Paragraph from '@tiptap/extension-paragraph'
import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import * as EditorIcon from '../../Icon'
import { ToolbarOptionGroup } from '../../Toolbar'
import { EditorContext } from '../../../context/EditorContext'
import { BlockActionsMenuProps, blockIconStyle } from './BlockActionsMenu'
import { BlockContext } from '../../../context/BlockContext'

export function useOptions(
  extraOptions: BlockActionsMenuProps['extraOptions'],
  basicOptions: BlockActionsMenuProps['basicOptions']
): [ToolbarOptionGroup, ToolbarOptionGroup] {
  const { t, editor } = React.useContext(EditorContext)
  const { getPosition } = React.useContext(BlockContext)
  const options = React.useMemo<ToolbarOptionGroup>(() => {
    const value: ToolbarOptionGroup = extraOptions ?? []
    if (basicOptions) value.push(basicOptions)
    return value
  }, [basicOptions, extraOptions])

  const getCurrentPosition = React.useCallback((): number | undefined => {
    const position = getPosition()

    if (position === undefined) return
    const node = editor?.view.state.doc.nodeAt(position)
    if (!node) return
    let nodeSize = node.nodeSize
    // Heading nodeSize
    if (node.type.name === Heading.name) {
      nodeSize = node.nodeSize - 2
    }

    return position + nodeSize
  }, [editor?.view.state.doc, getPosition])

  const blockOptions = React.useMemo<ToolbarOptionGroup>(
    () => [
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'text',
            label: t('block_actions.blocks.text'),
            icon: <EditorIcon.TextStyle className={blockIconStyle()} square={true} />,
            closeOnAction: true,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Paragraph.name })
                .focus()
                .run()
            }
          }
        ]
      },
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'heading1',
            label: t('block_actions.blocks.h1'),
            icon: <EditorIcon.RteH1 square={true} className={blockIconStyle()} />,
            closeOnAction: true,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Heading.name, attrs: { level: 1 } })
                .focus()
                .run()
            }
          },
          {
            type: 'item',
            name: 'heading2',
            label: t('block_actions.blocks.h2'),
            icon: <EditorIcon.RteH2 square={true} className={blockIconStyle()} />,
            closeOnAction: true,
            onAction: () => {
              const position = getCurrentPosition()
              console.log(position)

              if (position === undefined) return
              const node = editor?.view.state.doc.nodeAt(position)
              if (!node) return
              const nodeSize = node.nodeSize

              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Heading.name, attrs: { level: 2 } })
                .focus()
                .run()
            }
          },
          {
            type: 'item',
            name: 'heading3',
            label: t('block_actions.blocks.h3'),
            icon: <EditorIcon.RteH3 square={true} className={blockIconStyle()} />,
            closeOnAction: true,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Heading.name, attrs: { level: 3 } })
                .focus()
                .run()
            }
          },
          {
            type: 'item',
            name: 'heading4',
            label: t('block_actions.blocks.h4'),
            icon: <EditorIcon.RteH4 square={true} className={blockIconStyle()} />,
            closeOnAction: true,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Heading.name, attrs: { level: 4 } })
                .focus()
                .run()
            }
          },
          {
            type: 'item',
            name: 'heading5',
            label: t('block_actions.blocks.h5'),
            icon: <EditorIcon.RteH5 square={true} className={blockIconStyle()} />,
            closeOnAction: true,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Heading.name, attrs: { level: 5 } })
                .focus()
                .run()
            }
          }
        ]
      },
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'numberedList',
            label: t('block_actions.blocks.numbered_list'),
            icon: <EditorIcon.ListOrdered square={true} className={blockIconStyle()} />,
            closeOnAction: true,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Paragraph.name })
                .focus()
                .wrapInBrickList(OrderedList.name)
                .focus()
                .run()
            }
          },
          {
            type: 'item',
            name: 'bulletedList',
            label: t('block_actions.blocks.bulleted_list'),
            icon: <EditorIcon.ListUnordered square={true} className={blockIconStyle()} />,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: Paragraph.name })
                .focus()
                .wrapInBrickList(BulletList.name)
                .focus()
                .run()
            }
          },
          {
            type: 'item',
            name: 'formula',
            label: t('block_actions.blocks.formula'),
            icon: <EditorIcon.Formula square={true} className={blockIconStyle()} />,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertFormulaBlock(position + nodeSize)
                .focus()
                .run()
            }
          },
          {
            type: 'item',
            name: 'code',
            label: t('block_actions.blocks.code'),
            icon: <EditorIcon.Code square={true} className={blockIconStyle()} />,
            onAction: () => {
              const position = getCurrentPosition()

              if (position === undefined) return
              const nodeSize = 1
              editor
                ?.chain()
                .insertContentAt(position + nodeSize, { type: CodeBlock.name })
                .focus()
                .run()
            }
          }
        ]
      }
    ],
    [editor, getCurrentPosition, t]
  )

  return [options, blockOptions]
}
