import { styled, theme } from '@mashcard/design-system'
import { isNonEmptyString } from '@mashcard/active-support'
import { FC } from 'react'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { DocumentFooter } from './DocumentFooter'
import { DocumentUnavailable } from './DocumentUnavailable'
import { PreviewViewProps } from './PreviewView'

export interface WebsiteDocumentProps {
  blockType: EmbedBlockType
  extension: PreviewViewProps['extension']
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  url: string
  title?: string
  displayName: string
  icon?: string | null
  iframeUrl?: string | null
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
  height: '37rem',
  width: '100%'
})

export const WebsiteDocument: FC<WebsiteDocumentProps> = ({
  extension,
  blockType,
  updateEmbedBlockAttributes,
  icon,
  url,
  title,
  displayName,
  iframeUrl
}) => {
  const hasFrame = isNonEmptyString(iframeUrl)

  return (
    <WebsiteDocumentContainer>
      {hasFrame ? (
        <WebsiteFrame src={iframeUrl} loading="lazy" title={title ?? ''} />
      ) : (
        <DocumentUnavailable url={url} />
      )}
      <DocumentFooter
        displayName={displayName}
        url={url}
        extension={extension}
        name={url}
        icon={icon}
        blockType={blockType}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    </WebsiteDocumentContainer>
  )
}
