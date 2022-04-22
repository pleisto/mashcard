import {
  BlockCreateShareLinkInput,
  Policytype,
  ShareLinkInput,
  ShareLinkState,
  useBlockCreateShareLinkMutation
} from '@/BrickdocGraphQL'
import anyoneIcon from '@/common/assets/anyone.svg'
import { Dropdown, Menu, MenuProps } from '@brickdoc/design-system'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { LineDown } from '@brickdoc/design-icons'
import { queryBlockShareLinks } from '../../graphql'
import * as Root from './index.style'
import { SpaceCard, SpaceType } from '@/common/components/SpaceCard'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'

interface ShareLinkListItemProps {
  isAnyOne?: boolean
  item: {
    policy: Policytype
    state: ShareLinkState
    shareSpaceData: {
      domain: string
      name?: string | null
    }
  }
  docMeta: NonNullDocMeta
}

const menuClassName = Root.menu()
const ANYONE_DOMAIN = 'anyone'

export const ShareLinkListItem: React.FC<ShareLinkListItemProps> = ({ docMeta, item, isAnyOne }) => {
  const { t } = useDocsI18n()
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation({ refetchQueries: [queryBlockShareLinks] })

  const anyOneMessage = item.state === ShareLinkState.Enabled ? t('invite.view_message') : t('invite.no_view_message')
  const userMessage = item.policy === Policytype.Edit ? t('invite.edit_message') : t('invite.view_message')
  const policyMessage = isAnyOne ? anyOneMessage : userMessage

  const onSwitchShareAnonymous = async (state: string): Promise<void> => {
    const policy: Policytype = Policytype.View
    const input: BlockCreateShareLinkInput = {
      id: docMeta.id,
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
    const shareLink: ShareLinkInput = { domain: item.shareSpaceData.domain, policy, state }
    const input: BlockCreateShareLinkInput = { id: docMeta.id, target: [shareLink] }

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
      </Menu.Item>
    </Menu>
  ) : (
    <Menu onAction={onClickMenu}>
      <Menu.Item className={menuClassName} itemKey={Policytype.View} active={item.policy === Policytype.View}>
        <div className="content">
          <div className="head">{t('invite.view_message')}</div>
          <div className="desc">{t('invite.view_message_description')}</div>
        </div>
      </Menu.Item>
      <Menu.Item className={menuClassName} itemKey={Policytype.Edit} active={item.policy === Policytype.Edit}>
        <div className="content">
          <div className="head">{t('invite.edit_message')}</div>
          <div className="desc">{t('invite.edit_message_description')}</div>
        </div>
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
  const space = (
    isAnyOne
      ? {
          domain: ANYONE_DOMAIN,
          avatarData: { url: anyoneIcon }
        }
      : item.shareSpaceData
  ) as SpaceType
  return (
    <Root.Item>
      <SpaceCard
        aliasName={isAnyOne ? 'Anyone with the link' : item.shareSpaceData.name}
        space={space}
        label={item.shareSpaceData.name !== ANYONE_DOMAIN && ''}
      />
      <Root.Action>{policyData}</Root.Action>
    </Root.Item>
  )
}
