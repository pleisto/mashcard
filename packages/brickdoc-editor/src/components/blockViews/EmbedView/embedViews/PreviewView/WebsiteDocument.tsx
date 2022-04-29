import { styled, theme } from '@brickdoc/design-system'
import { FC } from 'react'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { DocumentFooter } from './DocumentFooter'

export interface WebsiteDocumentProps {
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  url: string
  title?: string
  icon?: string | null
}

const WebsiteDocumentContainer = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  height: '40rem',
  maxWidth: '100%',
  width: '60rem'
})

const WebsiteFrame = styled('iframe', {
  flex: 1
})

export const WebsiteDocument: FC<WebsiteDocumentProps> = ({
  blockType,
  updateEmbedBlockAttributes,
  icon,
  url,
  title
}) => {
  return (
    <WebsiteDocumentContainer>
      <WebsiteFrame src={url} title={title ?? ''} />
      <DocumentFooter
        name={url}
        icon={icon}
        blockType={blockType}
        updateEmbedBlockAttributes={updateEmbedBlockAttributes}
      />
    </WebsiteDocumentContainer>
  )
}
