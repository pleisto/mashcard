import { styled } from '@brickdoc/design-system'

export const PageContent = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 5.5rem'
})

export const Page = styled('div', {
  scrollbarGutter: 'stable both-edges',
  overflowY: 'auto',
  flex: 1,
  borderRadius: '2px',
  variants: {
    width: {
      md: {},
      sm: {
        width: '100vw',
        [`${PageContent}`]: {
          padding: '0 1rem'
        }
      }
    }
  }
})
