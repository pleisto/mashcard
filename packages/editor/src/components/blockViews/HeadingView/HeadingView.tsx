import { FC, useMemo } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { css, theme } from '@mashcard/design-system'
import { BlockContainer } from '../BlockContainer'
import { HeadingViewProps } from '../../../extensions/blocks/heading/meta'

const actionButtonStyle = css({
  include: ['flexCenter'],
  display: 'flex',
  variants: {
    level: {
      1: {
        lineHeight: theme.lineHeights.title1,
        height: theme.lineHeights.title1,
        marginTop: theme.titleOffset.title1
      },
      2: {
        lineHeight: theme.lineHeights.title2,
        height: theme.lineHeights.title2,
        marginTop: theme.titleOffset.title2
      },
      3: {
        lineHeight: theme.lineHeights.title3,
        height: theme.lineHeights.title3,
        marginTop: theme.titleOffset.title3
      },
      4: {
        lineHeight: theme.lineHeights.title4,
        height: theme.lineHeights.title4,
        marginTop: theme.titleOffset.title4
      },
      5: {
        lineHeight: theme.lineHeights.title5,
        height: theme.lineHeights.title5,
        marginTop: theme.titleOffset.title5
      },
      6: {
        lineHeight: theme.lineHeights.title5,
        height: theme.lineHeights.title5,
        marginTop: theme.titleOffset.title5
      }
    }
  }
})

export const HeadingView: FC<HeadingViewProps> = ({ node, deleteNode, extension, getPos }) => {
  const as = useMemo(() => {
    switch (Number(node.attrs.level)) {
      case 2:
        return 'h2'
      case 3:
        return 'h3'
      case 4:
        return 'h4'
      case 5:
      case 6:
        return 'h5'
      case 1:
      default:
        return 'h1'
    }
  }, [node.attrs.level])

  const actionButtonClassName = actionButtonStyle({ level: node.attrs.level })

  const HTMLAttributes =
    (typeof extension.options?.HTMLAttributes === 'function'
      ? extension.options.HTMLAttributes(node.attrs)
      : extension.options.HTMLAttributes) ?? {}

  return (
    <BlockContainer
      editable="custom"
      node={node}
      actionOptions={['cut', 'copy', 'delete', 'transform']}
      actionButtonClassName={actionButtonClassName}
      getPos={getPos}
      deleteNode={deleteNode}
      contentForCopy={node.textContent}>
      <NodeViewContent {...HTMLAttributes} as={as} />
    </BlockContainer>
  )
}
