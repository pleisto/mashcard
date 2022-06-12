import {
  BlockCreateShareLinkInput,
  Policytype,
  ShareLinkInput,
  ShareLinkState,
  useBlockCreateShareLinkMutation
} from '@/BrickdocGraphQL'
import { Dropdown, Menu, MenuProps } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { LineDown, Anyone, Check } from '@brickdoc/design-icons'
import { queryBlockShareLinks } from '../../graphql'
import * as Root from './index.style'
import { PodCard, PodType } from '@/common/components/PodCard'
import { useNonNullDocMeta } from '@/docs/store/DocMeta'

interface ShareLinkListItemProps {
  isAnyOne?: boolean
  item: {
    policy: Policytype
    state: ShareLinkState
    sharePodData: {
      domain: string
      name?: string | null
    }
  }
}

const menuClassName = Root.menu()
const ANYONE_DOMAIN = 'anyone'

export const ShareLinkListItem: React.FC<ShareLinkListItemProps> = ({ item, isAnyOne }) => {
  const { t } = useDocsI18n()
  const { id } = useNonNullDocMeta()
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation({ refetchQueries: [queryBlockShareLinks] })

  const anyOneMessage = item.state === ShareLinkState.Enabled ? t('invite.view_message') : t('invite.no_view_message')
  const userMessage = item.policy === Policytype.Edit ? t('invite.edit_message') : t('invite.view_message')
  const policyMessage = isAnyOne ? anyOneMessage : userMessage

  const onSwitchShareAnonymous = async (state: string): Promise<void> => {
    const policy: Policytype = Policytype.View
    const input: BlockCreateShareLinkInput = {
      id,
      target: [{ domain: ANYONE_DOMAIN, policy, state: state as ShareLinkState }]
    }
    await blockCreateShareLink({ variables: { input } })
  }

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
    const shareLink: ShareLinkInput = { domain: item.sharePodData.domain, policy, state }
    const input: BlockCreateShareLinkInput = { id, target: [shareLink] }

    await blockCreateShareLink({ variables: { input } })
  }

  const menu = isAnyOne ? (
    <Menu onAction={onSwitchShareAnonymous}>
      <Menu.Item
        className={menuClassName}
        itemKey={ShareLinkState.Enabled}
        active={item.state === ShareLinkState.Enabled}
      >
        <div className="content">
          <div className="head">{t('invite.view_message')}</div>
          <div className="desc">{t('invite.view_message_description')}</div>
        </div>
        {item.state === ShareLinkState.Enabled && <Check className="check-icon" />}
      </Menu.Item>
      <Menu.Item
        className={menuClassName}
        itemKey={ShareLinkState.Disabled}
        active={item.state === ShareLinkState.Disabled}
      >
        <div className="content">
          <div className="head">{t('invite.no_view_message')}</div>
          <div className="desc">{t('invite.no_view_message_description')}</div>
        </div>
        {item.state === ShareLinkState.Disabled && <Check className="check-icon" />}
      </Menu.Item>
    </Menu>
  ) : (
    <Menu onAction={onClickMenu}>
      <Menu.Item className={menuClassName} itemKey={Policytype.View} active={item.policy === Policytype.View}>
        <div className="content">
          <div className="head">{t('invite.view_message')}</div>
          <div className="desc">{t('invite.view_message_description')}</div>
        </div>
        {item.policy === Policytype.View && <Check className="check-icon" />}
      </Menu.Item>
      <Menu.Item className={menuClassName} itemKey={Policytype.Edit} active={item.policy === Policytype.Edit}>
        <div className="content">
          <div className="head">{t('invite.edit_message')}</div>
          <div className="desc">{t('invite.edit_message_description')}</div>
        </div>
        {item.policy === Policytype.Edit && <Check className="check-icon" />}
      </Menu.Item>
      <Menu.Item className={menuClassName} itemKey="remove" danger>
        <div className="content">{t('invite.remove_message')}</div>
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
  const pod = (
    isAnyOne
      ? {
          domain: ANYONE_DOMAIN,
          avatarData: {
            __typename: 'avatarComp',
            comp: (
              <div className="anyone-icon">
                <Anyone />
              </div>
            )
          }
        }
      : item.sharePodData
  ) as PodType
  return (
    <Root.Item>
      <PodCard
        aliasName={isAnyOne ? t('invite.anyone_with_link') : item.sharePodData.name}
        pod={pod}
        label={item.sharePodData.name !== ANYONE_DOMAIN && ''}
      />
      <Root.Action>{policyData}</Root.Action>
    </Root.Item>
  )
}
