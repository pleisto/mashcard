import { styled, theme } from '@mashcard/design-system'
import { FC } from 'react'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { DocumentFooter } from './DocumentFooter'
import { DocumentUnavailable } from './DocumentUnavailable'
import { useWebsiteDocumentStatus } from './useWebsiteDocumentStatus'

export interface WebsiteDocumentProps {
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  url: string
  title?: string
  displayName: string
  icon?: string | null
}

const WebsiteDocumentContainer = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  width: '60rem'
})

const WebsiteFrame = styled('iframe', {
  height: '37rem'
})

export const WebsiteDocument: FC<WebsiteDocumentProps> = ({
  blockType,
  updateEmbedBlockAttributes,
  icon,
  url,
  title,
  displayName
}) => {
  const [error, handleLoad] = useWebsiteDocumentStatus()

  return (
    <WebsiteDocumentContainer>
      {error ? <DocumentUnavailable url={url} /> : <WebsiteFrame src={url} title={title ?? ''} onLoad={handleLoad} />}
      <DocumentFooter
        displayName={displayName}
        url={url}
        name={url}
        icon={icon}
        blockType={blockType}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    </WebsiteDocumentContainer>
  )
}
