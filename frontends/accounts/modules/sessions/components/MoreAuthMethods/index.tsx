import React from "react"
import { authMethod } from "../../hooks/useAccountsAuthMethods"
import { useAccountsI18n } from "@/accounts/modules/common/hooks"
import { Divider, Button, Tooltip } from "@brickdoc/design-system"
import styles from './index.module.less'
interface MoreAuthMethodsProps {
  methods: authMethod[]
}

const MoreAuthMethods: React.FC<MoreAuthMethodsProps> = ({ methods }) => {
  const { t } = useAccountsI18n()
  return (<div className={styles.moreAuth}>
    <Divider plain>{t('sessions.more_login_options')}</Divider>
    {methods.map(i =>
      <Tooltip key={i.name} title={t('sessions.login_via', { provider: t(`provider.${i.name}`) })}>
      <Button shape="circle" icon={i.logo} onClick={i.action} />
    </Tooltip>)}
  </div>)
}

export default MoreAuthMethods
