import { FC } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import { CalloutViewProps } from '../../../extensions/blocks/callout/meta'
import { styled, theme } from '@brickdoc/design-system'
import { useIcon } from './useIcon'

const CalloutContainer = styled('div', {
  background: theme.colors.yellow1,
  border: `1px solid ${theme.colors.borderOverlayPrimary}`,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'row',
  padding: '1.25rem 1.5rem'
})

const IconContainer = styled('div', {
  marginRight: '.75rem'
})

export const CalloutView: FC<CalloutViewProps> = ({ deleteNode, node, extension, getPos, updateAttributes }) => {
  const [icon] = useIcon(node.attrs.icon, {
    extension,
    updateAttributes
  })
  return (
    <BlockContainer
      editable="custom"
      node={node}
      actionOptions={['cut', 'copy', 'delete']}
      deleteNode={deleteNode}
      getPos={getPos}>
      <CalloutContainer>
        <IconContainer>{icon}</IconContainer>
        <NodeViewContent as="span" />
      </CalloutContainer>
    </BlockContainer>
  )
}
