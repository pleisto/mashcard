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
  previewHtml?: string | null
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

const WebsiteFrame = styled('div', {
  '.iframely-embed, .iframely-responsive, iframe': {
    height: '37rem',
    width: '100%'
  }
})

export const WebsiteDocument: FC<WebsiteDocumentProps> = ({
  extension,
  blockType,
  updateEmbedBlockAttributes,
  icon,
  url,
  title,
  displayName,
  previewHtml
}) => {
  const hasContent = isNonEmptyString(previewHtml)

  return (
    <WebsiteDocumentContainer>
      {hasContent ? (
        <WebsiteFrame
          dangerouslySetInnerHTML={{
            __html: previewHtml
          }}
        />
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
