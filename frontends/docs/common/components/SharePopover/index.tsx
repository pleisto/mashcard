/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useMemo } from 'react'
import { Button, Input, Icon, Popover, Switch, toast, cx, useList } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { InviteModal } from '../InviteModal'
import {
  useBlockCreateShareLinkMutation,
  BlockCreateShareLinkInput,
  Policytype,
  ShareLinkState,
  useGetBlockShareLinksQuery,
  ShareLink
} from '@/BrickdocGraphQL'
import { ShareLinkListItem } from '../ShareLinkListItem'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import styles from './index.module.less'
import { List, Item } from './index.style'

interface SharePopoverProps {
  docMeta: NonNullDocMeta
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const SharePopover: React.FC<SharePopoverProps> = ({ docMeta, visible, setVisible }) => {
  const { t } = useDocsI18n()
  const [shareWithAnonymousLoading, setShareWithAnonymousLoading] = React.useState<boolean>(false)
  const [anonymousEditableLoading, setAnonymousEditableLoading] = React.useState<boolean>(false)
  const [shareWithAnonymousValue, setShareWithAnonymousValue] = React.useState<boolean>(false)
  const [anonymousEditableValue, setAnonymousEditableValue] = React.useState<boolean>(false)
  const [inviteModalVisible, setInviteModalVisible] = React.useState<boolean>(false)
  const [copied, setCopied] = React.useState<boolean>(false)
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation()
  const { data } = useGetBlockShareLinksQuery({ fetchPolicy: 'no-cache', variables: { id: docMeta.id } })
  const { list, getKey, addList } = useList<ShareLink>()

  const ANYONE_WEBID = 'anyone'

  useEffect(() => {
    const anyoneShareLink = data?.blockShareLinks.find(link => link.sharePodData.webid === ANYONE_WEBID)
    if (anyoneShareLink) {
      setShareWithAnonymousValue(anyoneShareLink.state === ShareLinkState.Enabled)
      setAnonymousEditableValue(anyoneShareLink.policy === Policytype.Edit)
    } else {
      setShareWithAnonymousValue(false)
      setAnonymousEditableValue(false)
    }
  }, [data, docMeta.webid, docMeta.id])

  const onClickInviteButton = (): void => {
    setInviteModalVisible(true)
  }

  const handleVisibleChange = (value: boolean): void => {
    if (!inviteModalVisible && !value) {
      setVisible(false)
    }
  }

  const onSwitchShareAnonymous = async (checked: boolean): Promise<void> => {
    setShareWithAnonymousLoading(true)
    const state: ShareLinkState = checked ? ShareLinkState.Enabled : ShareLinkState.Disabled
    const policy: Policytype = anonymousEditableValue ? Policytype.Edit : Policytype.View
    const input: BlockCreateShareLinkInput = {
      id: docMeta.id,
      target: [{ webid: ANYONE_WEBID, policy, state }]
    }
    await blockCreateShareLink({ variables: { input } })
    setShareWithAnonymousValue(checked)
    setShareWithAnonymousLoading(false)
  }

  const onSwitchAnonymousEditable = async (checked: boolean): Promise<void> => {
    setAnonymousEditableLoading(true)
    const state: ShareLinkState = shareWithAnonymousValue ? ShareLinkState.Enabled : ShareLinkState.Disabled
    const policy: Policytype = checked ? Policytype.Edit : Policytype.View
    const input: BlockCreateShareLinkInput = {
      id: docMeta.id,
      target: [{ webid: ANYONE_WEBID, policy, state }]
    }
    await blockCreateShareLink({ variables: { input } })
    setAnonymousEditableValue(checked)
    setAnonymousEditableLoading(false)
  }

  const link = `${docMeta.host}${docMeta.path}`
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(link)
    void toast.success(t('share.copy_hint'))
    setCopied(true)
  }

  const allowEditContent = shareWithAnonymousValue ? (
    <>
      <div className={cx(styles.row, styles.bordered)}>
        <div className={styles.content}>
          <label htmlFor="allow-edit-content-switch" className={styles.head}>
            {t('share.allow_edit')}
          </label>
        </div>
        <div className={styles.action}>
          <Switch
            id="allow-edit-content-switch"
            size="sm"
            onChange={async e => await onSwitchAnonymousEditable(e.target.checked)}
            loading={anonymousEditableLoading}
            checked={anonymousEditableValue}
          />
        </div>
      </div>
    </>
  ) : null

  const inviteData = useMemo(
    () =>
      data?.blockShareLinks.filter(
        link => link.state === ShareLinkState.Enabled && link.sharePodData.webid !== ANYONE_WEBID
      ) ?? [],
    [data]
  )

  const suggestPods =
    data?.blockShareLinks.filter(link => link.sharePodData.webid !== ANYONE_WEBID).map(link => link.sharePodData) ?? []

  useEffect(() => {
    addList(inviteData as ShareLink[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteData])

  const inviteList = list.length ? (
    <div className={styles.invite_list}>
      <List>
        {list.map((item: ShareLink, index: number) => (
          <Item key={getKey(index)}>
            <ShareLinkListItem docMeta={docMeta} item={item} />
          </Item>
        ))}
      </List>
    </div>
  ) : (
    <></>
  )

  const shareContent = (
    <>
      <div className={cx(styles.row, styles.bordered)}>
        <div className={styles.icon}>
          <Icon.International />
        </div>
        <div className={styles.content}>
          <label htmlFor="share-to-web-switch" className={styles.head}>
            {t('share.share_to_web')}
          </label>
          <span className={styles.description}>{t('share.share_to_web_description')}</span>
        </div>
        <div className={styles.action}>
          <Switch
            id="share-to-web-switch"
            size="sm"
            onChange={async e => await onSwitchShareAnonymous(e.target.checked)}
            loading={shareWithAnonymousLoading}
            checked={shareWithAnonymousValue}
          />
        </div>
      </div>
      {allowEditContent}

      <div className={cx(styles.row, styles.bordered)}>
        <div role="button" tabIndex={-1} className={styles.inputWrapper} onClick={onClickInviteButton}>
          <Input className={styles.input} placeholder={t('share.invite_placeholder')} readOnly />
          <Button className={styles.inputButton} type="primary">
            {t('share.invite_button')}
          </Button>
        </div>
      </div>

      {inviteList}

      <div className={styles.footer}>
        <div className={styles.content}>
          <Icon.Help />
          <span>{t('share.learn')}</span>
        </div>
        <div role="button" tabIndex={-1} onClick={handleCopy} className={styles.action}>
          {copied ? <Icon.Check /> : <Icon.Link />}
          <span>{t(copied ? 'share.copy_link_button_done' : 'share.copy_link_button')}</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Popover
        title={null}
        trigger="click"
        placement="bottom"
        visible={visible}
        content={shareContent}
        overlayClassName={styles.popover}
        onVisibleChange={handleVisibleChange}
      />
      <InviteModal
        docMeta={docMeta}
        visible={inviteModalVisible}
        suggestPods={suggestPods}
        setVisible={setInviteModalVisible}
      />
    </>
  )
}
