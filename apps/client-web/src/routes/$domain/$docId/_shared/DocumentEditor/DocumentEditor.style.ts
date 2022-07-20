import { styled } from '@mashcard/design-system'

export const PageSpinWrapper = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  include: ['flexCenter']
})

export const PageContent = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 40px'
})

export const Page = styled('div', {
  flex: 1,
  borderRadius: '2px',
  width: '100%',
  variants: {
    width: {
      md: {},
      sm: {
        padding: 0,
        [`${PageContent}`]: {
          padding: '0 1rem'
        }
      }
    }
  }
})
