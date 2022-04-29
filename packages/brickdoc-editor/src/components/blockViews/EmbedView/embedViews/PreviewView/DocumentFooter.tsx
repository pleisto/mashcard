import { FC, ReactElement } from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { ModeSwitch } from '../ModeSwitch'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'

export interface DocumentFooterProps {
  icon?: ReactElement | string | null
  name: string
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
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
  lineHeight: '1.375rem'
})

const LinkIcon = styled('img', {
  height: '.875rem',
  marginRight: '.25rem',
  width: '.875rem'
})

export const ModeSwitchContainer = styled('div', {
  bottom: '.5rem',
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: '.75rem',
  transition: 'opacity 100ms ease-in-out',

  [`& ${ModeSwitch}`]: {}
})

export const DocumentFooter: FC<DocumentFooterProps> = ({ name, icon, blockType, updateEmbedBlockAttributes }) => (
  <Footer>
    <Info>
      {icon && (typeof icon === 'string' ? <LinkIcon alt="icon" src={icon} /> : icon)}
      {name}
    </Info>
    <ModeSwitchContainer>
      <ModeSwitch mode="preview" blockType={blockType} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />
    </ModeSwitchContainer>
  </Footer>
)
