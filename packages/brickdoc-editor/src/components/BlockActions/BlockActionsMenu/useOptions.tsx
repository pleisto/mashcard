import React from 'react'
import Paragraph from '@tiptap/extension-paragraph'
import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import { Icon } from '@brickdoc/design-system'
import { ActionIcon } from './BlockActionsMenu'
import * as EditorIcon from '../../Icon'
import { ToolbarOptionGroup } from '../../Toolbar'
import { EditorContext } from '../../../context/EditorContext'
import { BlockActionsMenuProps } from '.'
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

  const blockOptions = React.useMemo<ToolbarOptionGroup>(
    () => [
      {
        type: 'group',
        items: [
          {
            type: 'item',
            name: 'text',
            label: t('block_actions.blocks.text'),
            icon: (
              <ActionIcon>
                <Icon.TextStyle />
              </ActionIcon>
            ),
            closeOnAction: true,
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.RteH1 />
              </ActionIcon>
            ),
            closeOnAction: true,
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.RteH2 />
              </ActionIcon>
            ),
            closeOnAction: true,
            onAction: () => {
              const position = getPosition()

              if (position === undefined) return
              const nodeSize = 1
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
            icon: (
              <ActionIcon>
                <EditorIcon.RteH3 />
              </ActionIcon>
            ),
            closeOnAction: true,
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.RteH4 />
              </ActionIcon>
            ),
            closeOnAction: true,
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.RteH5 />
              </ActionIcon>
            ),
            closeOnAction: true,
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.ListOrdered />
              </ActionIcon>
            ),
            closeOnAction: true,
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.ListUnordered />
              </ActionIcon>
            ),
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.Formula />
              </ActionIcon>
            ),
            onAction: () => {
              const position = getPosition()

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
            icon: (
              <ActionIcon>
                <EditorIcon.Code />
              </ActionIcon>
            ),
            onAction: () => {
              const position = getPosition()

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
    [editor, getPosition, t]
  )

  return [options, blockOptions]
}
