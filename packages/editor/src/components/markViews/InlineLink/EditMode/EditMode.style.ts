import { Unlink } from '@mashcard/design-icons'
import { Button, Input, Menu, styled, theme } from '@mashcard/design-system'
import { IconBackground } from '../../../ui'

export const Title = styled('span', {
  color: theme.colors.typeSecondary,
  fontWeight: 600,
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline
})

export const LinkInput = styled(Input, {})

export const UnlinkIcon = styled(Unlink, {
  color: theme.colors.iconThirdary,
  fontSize: '.75rem'
})

export const RemoveButton = styled(Button, {
  variants: {
    size: {
      md: {
        color: theme.colors.typeThirdary,
        fontSize: theme.fontSizes.callout,
        fontWeight: 500,
        lineHeight: theme.lineHeights.callout,
        minWidth: 'unset',
        padding: '.375rem .5rem'
      }
    }
  }
})

export const ConfirmShortcut = styled('span', {
  border: `1px solid ${theme.colors.grey5}`,
  borderRadius: '4px',
  color: theme.colors.typeThirdary,
  fontSize: '.75rem',
  fontWeight: 400,
  lineHeight: '15.74px',
  padding: '.25rem'
})

export const InputIcon = styled('span', {
  color: theme.colors.iconThirdary,
  fontSize: '1rem'
})

export const InputPlaceholder = styled('div', {
  height: '2rem'
})

export const InputContainer = styled('div', {
  variants: {
    mode: {
      default: {
        width: '100%'
      },
      selector: {
        include: ['ceramicPrimary'],
        left: '-0.5rem',
        position: 'absolute',
        right: '-0.5rem',
        top: 0,

        [`& > ${LinkInput}`]: {
          margin: '0 .58rem',
          width: 'auto'
        }
      }
    }
  }
})

export const OptionsMenu = styled(Menu, {
  width: '100%'
})

export const OptionsMenuGroup = styled(Menu.Group, {
  width: '100%'
})

export const OptionsMenuItem = styled(Menu.Item, {
  width: '100%'
})

export const OptionsMenuItemInner = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  height: '2.5rem'
})

export const OptionsMenuItemContent = styled('div', {
  display: 'flex',
  flexDirection: 'column'
})

export const OptionsMenuItemLabel = styled('span', {
  color: theme.colors.typePrimary,
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 450,
  lineHeight: '1.375rem'
})

export const OptionsMenuItemDescription = styled('span', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  lineHeight: '1.125rem'
})

export const OptionsMenuItemIconWrapper = styled(IconBackground, {
  color: theme.colors.iconThirdary,
  fontSize: '.8125rem',
  height: '1.625rem',
  marginRight: '.5rem',
  width: '1.625rem'
})
