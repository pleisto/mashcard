import { FC, ReactElement } from 'react'
import { styled, theme } from '@mashcard/design-system'
import { EmbedToolbar, EmbedToolbarProps } from '../EmbedToolbar'
import { useEditorContext } from '../../../../../hooks'

export interface DocumentFooterProps extends Omit<EmbedToolbarProps, 'mode'> {
  icon?: ReactElement | string | null
  name: string
}

const Footer = styled('div', {
  alignItems: 'center',
  background: theme.colors.backgroundPrimary,
  display: 'flex',
  flexDirection: 'row',
  height: '3rem',
  padding: '0 1rem',
  position: 'relative'
})

const Info = styled('div', {
  alignItems: 'center',
  color: theme.colors.typeThirdary,
  display: 'flex',
  flexDirection: 'row',
  fontSize: '.875rem',
  fontWeight: 450,
  lineHeight: '1.375rem',
  maxWidth: '100%'
})

const Name = styled('span', {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

const LinkIcon = styled('img', {
  height: '.875rem',
  marginRight: '.25rem',
  width: '.875rem'
})

export const EmbedToolbarContainer = styled('div', {
  background: theme.colors.backgroundPrimary,
  bottom: '.5rem',
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: '.75rem',
  transition: 'opacity 100ms ease-in-out'
})

export const DocumentFooter: FC<DocumentFooterProps> = ({
  url,
  displayName,
  name,
  icon,
  blockType,
  extension,
  updateEmbedBlockAttributes,
  onFullScreen
}) => {
  const { documentEditable } = useEditorContext()
  return (
    <Footer>
      <Info>
        {icon && (typeof icon === 'string' ? <LinkIcon alt="" src={icon} /> : icon)}
        <Name>{name}</Name>
      </Info>
      {documentEditable && (
        <EmbedToolbarContainer>
          <EmbedToolbar
            url={url}
            extension={extension}
            displayName={displayName}
            mode="preview"
            blockType={blockType}
            updateEmbedBlockAttributes={updateEmbedBlockAttributes}
            onFullScreen={onFullScreen}
          />
        </EmbedToolbarContainer>
      )}
    </Footer>
  )
}
