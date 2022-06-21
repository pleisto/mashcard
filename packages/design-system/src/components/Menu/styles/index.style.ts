import { theme, css } from '../../../themes'

export const itemSpacing = '1.25rem'
export const itemMinHeight = '2.5rem'
const itemLineHeight = '1.375rem'

const danger = {
  color: theme.colors.errorDefault
}

export const menuStyle = css({
  include: ['ceramicPrimary'],
  borderRadius: '4px',
  display: 'inline-block',
  margin: 0,
  listStyle: 'none',
  padding: 0,

  '&-item': {
    alignItems: 'center',
    color: theme.colors.typePrimary,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: theme.fontSizes.subHeadline,
    fontWeight: 500,
    lineHeight: itemLineHeight,
    minHeight: itemMinHeight,
    minWidth: '15rem',
    outline: 'none',
    padding: `0 ${itemSpacing}`,
    '&:hover, &:focus, &:active': {
      background: theme.colors.secondaryHover
    },
    input: {
      background: theme.colors.ceramicQuaternary,
      border: `1px solid ${theme.colors.borderPrimary}`,
      borderRadius: '4px',
      fontSize: theme.fontSizes.subHeadline,
      fontWeight: 500,
      lineHeight: '1.25rem',
      margin: `${itemSpacing} 0`,
      height: '28px',
      outline: 'none',
      padding: '.5rem .625rem',
      '&::placeholder': {
        color: theme.colors.typeThirdary
      }
    },
    '&-danger': danger
  }
})
