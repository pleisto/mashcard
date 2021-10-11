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
import { LineDown } from '@brickdoc/design-system/components/icon'
import { queryBlockShareLinks } from '../../graphql'
import styles from './index.module.less'
import { PodCard, PodType } from '../PodCard'

interface ShareLinkListItemProps {
  item: ShareLink
  blockId: string
}

export const ShareLinkListItem: React.FC<ShareLinkListItemProps> = ({ blockId, item }) => {
  const { t } = useDocsI18n()
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation({ refetchQueries: [queryBlockShareLinks] })

  const policyMessage = item.policy === Policytype.Edit ? t('invite.edit_message') : t('invite.view_message')

  const onClickMenu: MenuProps['onClick'] = async ({ key }): Promise<void> => {
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
    const shareLink: ShareLinkInput = { webid: item.shareWebid, policy, state }
    const input: BlockCreateShareLinkInput = { id: blockId, target: [shareLink] }

    await blockCreateShareLink({ variables: { input } })
  }

  const menu = (
    <Menu onClick={onClickMenu} selectedKeys={[item.policy]}>
      <Menu.Item className={styles.menuItem} key={Policytype.View}>
        <div className={styles.head}>{t('invite.view_message')}</div>
        <div className={styles.desc}>{t('invite.view_message_description')}</div>
      </Menu.Item>
      <Menu.Item className={styles.menuItem} key={Policytype.Edit}>
        <div className={styles.head}>{t('invite.edit_message')}</div>
        <div className={styles.desc}>{t('invite.edit_message_description')}</div>
      </Menu.Item>
      <Menu.Item className={styles.menuItem} key="remove" danger>
        {t('invite.remove_message')}
      </Menu.Item>
    </Menu>
  )
  const policyData = (
    <Dropdown overlay={menu} arrow={true}>
      <div>
        {policyMessage} <LineDown />
      </div>
    </Dropdown>
  )

  return (
    <div className={styles.row}>
      <PodCard pod={item.sharePodData as PodType} />
      <div className={styles.action}>{policyData}</div>
    </div>
  )
}
