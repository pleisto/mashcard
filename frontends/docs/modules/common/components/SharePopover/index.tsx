import React, { useContext, useEffect } from 'react'
import { Button, Col, Divider, List, Popover, Row, Switch } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { Help, International, Link } from '@brickdoc/design-system/components/icon'
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
import styles from './index.module.less'
import { BrickdocContext } from '@/common/PWAProvider'

interface SharePopoverProps {
  webid: string
  visible: boolean
  blockId: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const SharePopover: React.FC<SharePopoverProps> = ({ webid, visible, blockId, setVisible }) => {
  const { t } = useDocsI18n()
  const [shareWithAnonymousLoading, setShareWithAnonymousLoading] = React.useState<boolean>(false)
  const [anonymousEditableLoading, setAnonymousEditableLoading] = React.useState<boolean>(false)
  const [shareWithAnonymousValue, setShareWithAnonymousValue] = React.useState<boolean>(false)
  const [anonymousEditableValue, setAnonymousEditableValue] = React.useState<boolean>(false)
  const [copyLoading, setCopyLoading] = React.useState<boolean>(false)
  const [inviteModalVisible, setInviteModalVisible] = React.useState<boolean>(false)
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation()
  const { data } = useGetBlockShareLinksQuery({ variables: { id: blockId } })

  const ANYONE_WEBID = 'anyone'

  useEffect(() => {
    const anyoneShareLink = data?.blockShareLinks.find(link => link.shareWebid === ANYONE_WEBID)
    if (anyoneShareLink) {
      setShareWithAnonymousValue(anyoneShareLink.state === ShareLinkState.Enabled)
      setAnonymousEditableValue(anyoneShareLink.policy === Policytype.Edit)
    } else {
      setShareWithAnonymousValue(false)
      setAnonymousEditableValue(false)
    }
  }, [data, webid, blockId])

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
      id: blockId,
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
      id: blockId,
      target: [{ webid: ANYONE_WEBID, policy, state }]
    }
    await blockCreateShareLink({ variables: { input } })
    setAnonymousEditableValue(checked)
    setAnonymousEditableLoading(false)
  }

  const { host } = useContext(BrickdocContext)

  const link = `${host}/${webid}/p/${blockId}`
  const handleCopy = (): void => {
    setCopyLoading(true)
    setTimeout(() => {
      void navigator.clipboard.writeText(link)
      setCopyLoading(false)
    }, 2000)
  }

  const allowEditContent = shareWithAnonymousValue ? (
    <>
      <Button type="text" className={styles.text_button} onClick={handleCopy} disabled={copyLoading}>
        <span className={styles.copy_link_placeholder}>{link}</span>
        <span className={styles.copy_button}>{t('share.copy')}</span>
      </Button>
      <Row className={styles.padding_top}>
        <Col span={20} className={styles.center}>
          <span className={styles.bold}>{t('share.allow_edit')}</span>
        </Col>
        <Col span={3} offset={1} className={styles.center}>
          <Switch onChange={onSwitchAnonymousEditable} loading={anonymousEditableLoading} checked={anonymousEditableValue} />
        </Col>
      </Row>

      <Divider />
    </>
  ) : (
    <></>
  )

  const inviteData = data?.blockShareLinks.filter(link => link.state === ShareLinkState.Enabled && link.shareWebid !== ANYONE_WEBID) ?? []
  const suggestPods = data?.blockShareLinks.filter(link => link.shareWebid !== ANYONE_WEBID).map(link => link.sharePodData) ?? []

  const inviteList = inviteData.length ? (
    <div className={styles.invite_list}>
      <List
        size="small"
        footer={null}
        header={null}
        dataSource={inviteData as ShareLink[]}
        renderItem={(item: ShareLink) => {
          return (
            <List.Item>
              <ShareLinkListItem blockId={blockId} item={item} />
            </List.Item>
          )
        }}
      />
    </div>
  ) : (
    <></>
  )

  const shareContent = (
    <>
      <Row>
        <Col span={2} className={styles.center}>
          <International />
        </Col>
        <Col span={18} className={styles.center}>
          <div>
            <div>
              <span className={styles.bold}>{t('share.share_to_web')}</span>
              <br />
              <span>{t('share.share_to_web_description')}</span>
            </div>
          </div>
        </Col>
        <Col span={3} offset={1} className={styles.center}>
          <div>
            <Switch onChange={onSwitchShareAnonymous} loading={shareWithAnonymousLoading} checked={shareWithAnonymousValue} />
          </div>
        </Col>
      </Row>

      <Divider />
      {allowEditContent}

      <Button type="text" className={styles.text_button} onClick={onClickInviteButton}>
        <span className={styles.invite_placeholder}>{t('share.invite_placeholder')}</span>
        <span className={styles.invite_button}>{t('share.invite_button')}</span>
      </Button>

      {inviteList}

      <Divider />

      <div>
        <Row>
          <Col span={10}>
            <Help />
            <span>{t('share.learn')}</span>
          </Col>
          <Col span={6} offset={8}>
            <Link />
            <span>{t('share.copy_link_button')}</span>
          </Col>
        </Row>
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
        onVisibleChange={handleVisibleChange}
      />
      <InviteModal
        webid={webid}
        blockId={blockId}
        visible={inviteModalVisible}
        suggestPods={suggestPods}
        setVisible={setInviteModalVisible}
      />
    </>
  )
}
