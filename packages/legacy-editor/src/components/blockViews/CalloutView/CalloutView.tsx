import { FC } from 'react'
import { BlockContainer } from '../BlockContainer'
import { CalloutViewProps } from '../../../extensions/blocks/callout/meta'
import { css, styled, theme } from '@mashcard/design-system'
import { iconWidth, useIcon } from './useIcon'
import { useEditorI18n } from '../../../hooks'
import { useNodeContent } from '@mashcard/editor'

const verticalPadding = '1.5rem'
const iconMarginRight = '0.75rem'

const CalloutContainer = styled('div', {
  background: theme.colors.yellow1,
  border: `1px solid ${theme.colors.borderOverlayPrimary}`,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'row',
  padding: `1.25rem ${verticalPadding}`,
  maxWidth: '45rem'
})

const placeholderStyle = css({
  '&:before': {
    color: theme.colors.typeDisabled,
    content: 'attr(data-placeholder)',
    fontWeight: 400,
    left: `calc(${iconWidth} + ${verticalPadding} + ${iconMarginRight})`,
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '50%',
    whiteSpace: 'nowrap'
  }
})

const IconContainer = styled('div', {
  marginRight: iconMarginRight
})

export const CalloutView: FC<CalloutViewProps> = ({ deleteNode, node, extension, getPos, updateAttributes }) => {
  const [icon] = useIcon(node.attrs.icon, {
    extension,
    updateAttributes
  })
  const [t] = useEditorI18n()
  const isEmpty = node.textContent.length === 0
  const placeholder = isEmpty ? t(`placeholder.callout`) : ''
  const placeholderClassName = placeholderStyle()
  const nodeContentRef = useNodeContent()

  return (
    <BlockContainer
      editable="custom"
      node={node}
      actionOptions={['cut', 'copy', 'delete']}
      deleteNode={deleteNode}
      getPos={getPos}>
      <CalloutContainer>
        <IconContainer>{icon}</IconContainer>
        <span ref={nodeContentRef} className={placeholderClassName} data-placeholder={placeholder} />
      </CalloutContainer>
    </BlockContainer>
  )
}
