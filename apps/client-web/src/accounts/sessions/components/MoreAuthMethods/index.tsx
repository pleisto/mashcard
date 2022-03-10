import React from 'react'
import { authMethod } from '../../hooks/useAccountsAuthMethods'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { Button, Tooltip, styled, theme } from '@brickdoc/design-system'

interface MoreAuthMethodsProps {
  methods: authMethod[]
}

const Wrapper = styled('div', {
  marginTop: '2rem',
  textAlign: 'center',
  '& > h3': {
    fontSize: '1rem',
    fontWeight: 'normal',
    color: theme.colors.typeThirdary,
    marginBottom: '2rem'
  },
  'nav > button': {
    marginRight: '1.875rem',
    width: '2rem',
    height: '2rem',
    border: 'none',
    '& > *': {
      fontSize: '2rem'
    },
    '&:hover, &:active': {
      border: 'none'
    },
    '&:last-child': {
      marginRight: 0
    }
  }
})

export const MoreAuthMethods: React.FC<MoreAuthMethodsProps> = ({ methods }) => {
  const { t } = useAccountsI18n()
  return (
    <Wrapper>
      <h3>{t('sessions.more_login_options')}</h3>
      <nav>
        {methods.map(i => (
          <Tooltip key={i.name} title={t('sessions.login_via', { provider: t(`provider.${i.name}`) })}>
            <Button id={`auth-btn-${i.name}`} circle aria-label={i.name} icon={i.logo} onClick={i.action} />
          </Tooltip>
        ))}
      </nav>
    </Wrapper>
  )
}
