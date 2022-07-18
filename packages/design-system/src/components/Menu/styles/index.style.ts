import { theme, css } from '../../../themes'

export const itemSpacing = '1.25rem'
export const itemMinHeight = '2.25rem'
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
    padding: `0 0 0 .5rem`,
    '&:hover, &:focus, &:active': {
      background: theme.colors.secondaryHover
    },
    '&-danger': danger
  }
})
