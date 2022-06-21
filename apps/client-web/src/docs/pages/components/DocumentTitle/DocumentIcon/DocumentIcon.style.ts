import { Button, styled, theme } from '@mashcard/design-system'

const size = '50px'
const smSize = '34px'

export const EmojiIcon = styled('span', {
  fontSize: size,
  fontFamily: theme.fonts.emoji
})

export const ImageIcon = styled('div', {
  height: size,
  width: size,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover'
})

export const Root = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 54,
  width: 54,
  fontSize: size,
  borderRadius: 2,
  padding: 0,
  marginRight: 3,
  variants: {
    width: {
      md: {},
      sm: {
        height: 42,
        width: 42,
        fontSize: smSize,
        [`${EmojiIcon}`]: {
          fontSize: smSize
        },
        [`${ImageIcon}`]: {
          height: 42,
          width: 42,
          fontSize: smSize
        }
      }
    }
  }
})
