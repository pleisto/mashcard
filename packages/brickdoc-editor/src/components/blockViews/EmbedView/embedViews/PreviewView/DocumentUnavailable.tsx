import { FC, useCallback } from 'react'
import { Button, styled, theme } from '@brickdoc/design-system'
import { useEditorI18n } from '../../../../../hooks'

export interface DocumentUnavailableProps {
  url: string
}

const UnavailableContainer = styled('div', {
  include: ['flexCenter'],

  background: theme.colors.backgroundSecondary,
  display: 'flex',
  flexDirection: 'column',
  height: '15.5rem'
})

const Tip = styled('span', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.body,
  fontWeight: 400,
  lineHeight: '1.5rem',
  marginBottom: '.75rem'
})

const LinkButton = styled(Button, {
  variants: {
    size: {
      md: {
        color: theme.colors.typeSecondary
      }
    }
  }
})

export const DocumentUnavailable: FC<DocumentUnavailableProps> = ({ url }) => {
  const [t] = useEditorI18n()

  const handleOpenLink = useCallback(() => {
    window.open(url, '_blank')
  }, [url])

  return (
    <UnavailableContainer>
      <Tip>{t('embed_block.view_types.preview.unavailable.tip')}</Tip>
      <LinkButton onClick={handleOpenLink} size="md">
        {t('embed_block.view_types.preview.unavailable.link_button')}
      </LinkButton>
    </UnavailableContainer>
  )
}
