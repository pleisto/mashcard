import { FC } from 'react'
import { Delete } from '@mashcard/design-icons'
import { Button, styled, theme } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { Link } from 'react-router-dom'
import { useDocMeta } from '../../DocMeta'
import { useDocsI18n } from '../../useDocsI18n'

const TrashLink = styled(Link, {
  width: '100%',
  height: 34,
  marginTop: 34,
  '&:hover, &:focus-visible, &:active': {
    textDecoration: 'none'
  },
  button: {
    paddingLeft: 29,
    width: '100%',
    justifyContent: 'flex-start',
    span: {
      fontSize: 14,
      fontWeight: 500,
      color: theme.colors.typeSecondary
    },
    '.mc-icon': {
      fontSize: 18
    }
  }
})

export const TrashButton: FC = () => {
  const { t } = useDocsI18n()
  const { domain } = useDocMeta()

  return (
    <TrashLink to={`/${domain}/trash`}>
      <Button type="text" icon={<Delete />} data-testid={TEST_ID_ENUM.trash.button.id}>
        {t('trash.name')}
      </Button>
    </TrashLink>
  )
}
