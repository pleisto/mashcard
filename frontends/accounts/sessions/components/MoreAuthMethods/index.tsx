import React from 'react'
import { authMethod } from '../../hooks/useAccountsAuthMethods'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { Divider, Button, Tooltip } from '@brickdoc/design-system'
import styles from './index.module.less'
interface MoreAuthMethodsProps {
  methods: authMethod[]
}

export const MoreAuthMethods: React.FC<MoreAuthMethodsProps> = ({ methods }) => {
  const { t } = useAccountsI18n()
  return (
    <div className={styles.moreAuth}>
      <Divider plain>{t('sessions.more_login_options')}</Divider>
      <nav>
        {methods.map(i => (
          <Tooltip key={i.name} title={t('sessions.login_via', { provider: t(`provider.${i.name}`) })}>
            <Button id={`auth-btn-${i.name}`} shape="circle" icon={i.logo} onClick={i.action} />
          </Tooltip>
        ))}
      </nav>
    </div>
  )
}
