/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react'
import { Button, Icon, Popover, toast, Spin, Select, Menu, Dropdown, theme } from '@brickdoc/design-system'

import { debounce } from '@brickdoc/active-support'
import { useDocsI18n } from '../../hooks'
import {
  useBlockCreateShareLinkMutation,
  Policytype,
  ShareLinkState,
  useGetBlockShareLinksQuery,
  QuerySpaceSearchDocument,
  QuerySpaceSearchQuery as Query,
  QuerySpaceSearchQueryVariables as Variables,
  BlockCreateShareLinkInput
} from '@/BrickdocGraphQL'
import { LineDown, Check } from '@brickdoc/design-icons'
import { useImperativeQuery } from '@/common/hooks'
import { ShareLinkListItem } from '../ShareLinkListItem'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { SpaceCard, SpaceType } from '@/common/components/SpaceCard'
import { queryBlockShareLinks } from '../../graphql'
import { Wrapper, InviteBar, List, Item, SharePopTitle, CopyLinkWrapper } from './index.style'
import { Action, menu } from '../ShareLinkListItem/index.style'
import { selectStyle } from './select.style'

const menuClassName = menu()
const prefixCls = selectStyle()
interface SharePopoverProps {
  docMeta: NonNullDocMeta
  children: React.ReactElement
}

const debounceTimeout = 800

type SpaceValue = string

export const SharePopover: React.FC<SharePopoverProps> = ({ docMeta, children }) => {
  const { t } = useDocsI18n()
  const [inviteLoading, setInviteLoading] = React.useState<boolean>(false)
  const [copied, setCopied] = React.useState<boolean>(false)
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation({ refetchQueries: [queryBlockShareLinks] })
  const { data } = useGetBlockShareLinksQuery({ fetchPolicy: 'no-cache', variables: { id: docMeta.id } })
  const [fetching, setFetching] = React.useState(false)
  const [spaceValue, setSpaceValue] = React.useState<SpaceValue[]>([])
  const spaceSearch = useImperativeQuery<Query, Variables>(QuerySpaceSearchDocument)
  const [options, setOptions] = React.useState<SpaceType[]>([])
  const [inviteUserPolicy, setInviteUserPolicy] = useState<Policytype>(Policytype.View)

  const inviteUsers = useCallback(async () => {
    setInviteLoading(true)
    const input: BlockCreateShareLinkInput = {
      id: docMeta.id,
      target: spaceValue.map(domain => ({
        domain,
        policy: inviteUserPolicy,
        state: ShareLinkState.Enabled
      }))
    }
    await blockCreateShareLink({ variables: { input } })
    setSpaceValue([])
    setOptions([])
    setInviteLoading(false)
  }, [spaceValue, inviteUserPolicy, blockCreateShareLink, docMeta.id, setOptions])

  const link = `${docMeta.host}${docMeta.path}`
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(link)
    void toast.success(t('share.copy_hint'))
    setCopied(true)
  }

  const anyoneItem = data?.blockShareLinks.find(item => item.shareSpaceData.name === 'anyone') ?? {
    policy: Policytype.View,
    state: ShareLinkState.Disabled,
    shareSpaceData: {
      domain: 'anyone',
      name: 'anyone'
    }
  }

  const inviteList = (
    <List>
      <Item key="anyone">
        <ShareLinkListItem docMeta={docMeta} item={anyoneItem} isAnyOne />
      </Item>
      {data?.blockShareLinks
        .filter(item => item.shareSpaceData.name !== 'anyone')
        .filter(item => item.state !== ShareLinkState.Disabled)
        .map(item => (
          <Item key={item.key}>
            <ShareLinkListItem docMeta={docMeta} item={item} />
          </Item>
        ))}
    </List>
  )

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = async (value: string): Promise<void> => {
      setOptions([])
      setFetching(true)
      const { data } = await spaceSearch({ input: value })
      const spaces: SpaceType[] = data?.spaceSearch?.filter(space => space.domain !== docMeta.domain) ?? []
      setOptions(spaces)
      setFetching(false)
    }

    return debounce(loadOptions, debounceTimeout)
  }, [spaceSearch, docMeta.domain])

  const onChangeInviterPolicy = (key: string) => {
    setInviteUserPolicy(key as Policytype)
  }

  const menu = (
    <Menu onAction={onChangeInviterPolicy}>
      <Menu.Item className={menuClassName} itemKey={Policytype.View} active={Policytype.View === inviteUserPolicy}>
        <div className="content">
          <div className="head">{t('invite.view_message')}</div>
          <div className="desc">{t('invite.view_message_description')}</div>
        </div>
        {Policytype.View === inviteUserPolicy && <Check className="check-icon" />}
      </Menu.Item>
      <Menu.Item className={menuClassName} itemKey={Policytype.Edit} active={Policytype.Edit === inviteUserPolicy}>
        <div className="content">
          <div className="head">{t('invite.edit_message')}</div>
          <div className="desc">{t('invite.edit_message_description')}</div>
        </div>
        {Policytype.Edit === inviteUserPolicy && <Check className="check-icon" />}
      </Menu.Item>
    </Menu>
  )
  const policyMessage = Policytype.Edit === inviteUserPolicy ? t('invite.edit_message') : t('invite.view_message')

  const policyData = (
    <Action
      css={{
        position: 'absolute',
        right: 86,
        top: 8
      }}
    >
      <Dropdown trigger="click" overlay={menu}>
        <div>
          {policyMessage} <LineDown />
        </div>
      </Dropdown>
    </Action>
  )

  const shareContent = (
    <Wrapper>
      <SharePopTitle>{t('share.share_title')}</SharePopTitle>
      <InviteBar>
        <Select
          menuItemSelectedIcon={<Check fill={theme.colors.primaryDefault.value} className="check-icon" />}
          prefixCls={prefixCls}
          className="user-picker"
          showSearch
          placeholder={t('invite.search')}
          notFoundContent={
            fetching ? (
              <Spin size="sm" />
            ) : (
              <span style={{ padding: '0 8px', color: theme.colors.typeSecondary.value }}>{t('invite.no_result')}</span>
            )
          }
          mode="multiple"
          filterOption={false}
          onSearch={debounceFetcher}
          value={spaceValue}
          onChange={newValue => {
            setSpaceValue(newValue)
          }}
        >
          {options.map(space => (
            <Select.Option key={space.domain} value={space.domain}>
              <SpaceCard size="xs" space={space} />
            </Select.Option>
          ))}
        </Select>
        {policyData}
        <Button
          type="primary"
          onClick={inviteUsers}
          disabled={inviteLoading || !spaceValue.length}
          className="invite-btn"
        >
          {t('share.invite_button')}
        </Button>
      </InviteBar>
      {inviteList}

      <CopyLinkWrapper>
        <Button type="primary" size="sm" onClick={handleCopy} icon={copied ? <Icon.Check /> : <Icon.Link />}>
          {t(copied ? 'share.copy_link_button_done' : 'share.copy_link_button')}
        </Button>
      </CopyLinkWrapper>
    </Wrapper>
  )

  return (
    <>
      <Popover
        title={null}
        trigger="click"
        placement="bottom"
        overlayStyle={{ zIndex: 1 }}
        overlayInnerStyle={{ marginRight: 48, marginTop: -5 }}
        content={shareContent}
      >
        {children}
      </Popover>
    </>
  )
}
