import {
  BlockCreateShareLinkInput,
  Policytype,
  ShareLink,
  ShareLinkInput,
  ShareLinkState,
  useBlockCreateShareLinkMutation
} from '@/BrickdocGraphQL'
import { Dropdown, Menu, MenuProps } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { LineDown } from '@brickdoc/design-icons'
import { queryBlockShareLinks } from '../../graphql'
import styles from './index.module.less'
import { SpaceCard, SpaceType } from '@/common/components/SpaceCard'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'

interface ShareLinkListItemProps {
  item: ShareLink
  docMeta: NonNullDocMeta
}

export const ShareLinkListItem: React.FC<ShareLinkListItemProps> = ({ docMeta, item }) => {
  const { t } = useDocsI18n()
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation({ refetchQueries: [queryBlockShareLinks] })

  const policyMessage = item.policy === Policytype.Edit ? t('invite.edit_message') : t('invite.view_message')

  const onClickMenu: MenuProps['onAction'] = async (key): Promise<void> => {
    let policy: Policytype = item.policy
    let state: ShareLinkState = item.state
    switch (key) {
      case Policytype.View:
        policy = Policytype.View
        break
      case Policytype.Edit:
        policy = Policytype.Edit
        break
      case 'remove':
        state = ShareLinkState.Disabled
        break
    }
    const shareLink: ShareLinkInput = { domain: item.shareSpaceData.domain, policy, state }
    const input: BlockCreateShareLinkInput = { id: docMeta.id, target: [shareLink] }

    await blockCreateShareLink({ variables: { input } })
  }

  const menu = (
    <Menu onAction={onClickMenu}>
      <Menu.Item className={styles.menuItem} itemKey={Policytype.View} active={item.policy === Policytype.View}>
        <div className={styles.head}>{t('invite.view_message')}</div>
        <div className={styles.desc}>{t('invite.view_message_description')}</div>
      </Menu.Item>
      <Menu.Item className={styles.menuItem} itemKey={Policytype.Edit} active={item.policy === Policytype.Edit}>
        <div className={styles.head}>{t('invite.edit_message')}</div>
        <div className={styles.desc}>{t('invite.edit_message_description')}</div>
      </Menu.Item>
      <Menu.Item className={styles.menuItem} itemKey="remove" danger>
        {t('invite.remove_message')}
      </Menu.Item>
    </Menu>
  )
  const policyData = (
    <Dropdown overlay={menu}>
      <div>
        {policyMessage} <LineDown />
      </div>
    </Dropdown>
  )

  return (
    <div className={styles.row}>
      <SpaceCard space={item.shareSpaceData as SpaceType} />
      <div className={styles.action}>{policyData}</div>
    </div>
  )
}
