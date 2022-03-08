import { styled } from '@brickdoc/design-system'

export const List = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  width: '100%',
  padding: 0,
  margin: 0,
  marginBottom: '24px',
  li: {
    '&>div': {
      height: 'unset'
    },
    padding: '.5rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:last-child': {
      borderBottom: 'none'
    }
  }
})
