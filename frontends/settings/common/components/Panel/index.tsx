import { FC, ReactNode } from 'react'
import { styled, theme } from '@brickdoc/design-system'

const PanelWrapper = styled('div', {
  marginBottom: '40px',
  '&>h2': {
    fontSize: theme.fontSizes.title3,
    lineHeight: '36px',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${theme.colors.overlaySecondary}`,
    marginBottom: '1rem'
  },
  '&.body': {
    display: 'flex',
    flexDirection: 'column'
  }
})

export const Panel: FC<{ title: ReactNode; css?: any }> = ({ children, title, css }) => {
  return (
    <PanelWrapper css={css}>
      <h2>{title}</h2>
      <div className="body">{children}</div>
    </PanelWrapper>
  )
}
