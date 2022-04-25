import { styled, theme } from '@brickdoc/design-system'
import { FC } from 'react'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { ModeSwitch } from '../ModeSwitch'

export interface WebsiteDocumentProps {
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  url: string
  title?: string
  icon?: string | null
}

const ModeSwitchContainer = styled('div', {
  bottom: '.5rem',
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: '.75rem',
  transition: 'opacity 100ms ease-in-out',

  [`& ${ModeSwitch}`]: {}
})

const WebsiteDocumentContainer = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  height: '40rem',
  maxWidth: '100%',
  width: '60rem',

  '&:hover': {
    [`& ${ModeSwitchContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  }
})

const WebsiteFrame = styled('iframe', {
  flex: 1
})

const Footer = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  height: '3rem',
  padding: '0 1rem',
  position: 'relative'
})

const Url = styled('div', {
  color: theme.colors.typeThirdary,
  fontSize: '.875rem',
  fontWeight: 450,
  lineHeight: '1.375rem'
})

const LinkIcon = styled('img', {
  height: '.875rem',
  marginRight: '.25rem',
  width: '.875rem'
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
      <Footer>
        <Url>
          {icon && <LinkIcon alt="icon" src={icon} />}
          {url}
        </Url>
        <ModeSwitchContainer>
          <ModeSwitch mode="card" blockType={blockType} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />
        </ModeSwitchContainer>
      </Footer>
    </WebsiteDocumentContainer>
  )
}
