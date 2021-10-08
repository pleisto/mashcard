import {
  BlockCreateShareLinkInput,
  Policytype,
  ShareLink,
  ShareLinkInput,
  ShareLinkState,
  useBlockCreateShareLinkMutation
} from '@/BrickdocGraphQL'
import { Col, Dropdown, Menu, MenuProps, Row } from '@brickdoc/design-system'
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
  const [menuLoading, setMenuLoading] = React.useState<boolean>(false)

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

    setMenuLoading(true)
    await blockCreateShareLink({ variables: { input } })
    setMenuLoading(false)
  }

  const menu = (
    <Menu onClick={onClickMenu} selectedKeys={[item.policy]}>
      <Menu.Item key={Policytype.View} disabled={menuLoading || item.policy === Policytype.View}>
        {t('invite.view_message')} <br /> {t('invite.view_message_description')}
      </Menu.Item>
      <Menu.Item key={Policytype.Edit} disabled={menuLoading || item.policy === Policytype.Edit}>
        {t('invite.edit_message')} <br /> {t('invite.edit_message_description')}
      </Menu.Item>
      <Menu.Item key="remove" danger disabled={menuLoading}>
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
    <>
      <Row>
        <Col span={20} className={styles.center}>
          <PodCard pod={item.sharePodData as PodType} />
        </Col>
        <Col span={8} className={styles.center}>
          {policyData}
        </Col>
      </Row>
    </>
  )
}
