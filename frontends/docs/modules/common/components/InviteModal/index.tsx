import React from 'react'
import { Button, Col, Divider, Dropdown, Menu, MenuProps, Modal, Row, Select, Spin, Tag } from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
import { Help, LineDown } from '@brickdoc/design-icons'
import {
  BlockCreateShareLinkInput,
  Policytype,
  QueryPodSearchDocument,
  QueryPodSearchQuery as Query,
  QueryPodSearchQueryVariables as Variables,
  ShareLinkState,
  useBlockCreateShareLinkMutation
} from '@/BrickdocGraphQL'
import { queryBlockShareLinks } from '../../graphql'
import { debounce } from 'lodash'
import styles from './index.module.less'
import { useImperativeQuery } from '@/common/hooks'
import { PodCard, PodType } from '../PodCard'
interface InviteModalProps {
  webid: string
  visible: boolean
  blockId: string
  suggestPods: PodType[]
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const InviteModal: React.FC<InviteModalProps> = ({ webid, visible, blockId, setVisible, suggestPods }) => {
  const { t } = useDocsI18n()
  const [blockCreateShareLink] = useBlockCreateShareLinkMutation({ refetchQueries: [queryBlockShareLinks] })
  const [inviteButtonLoading, setInviteButtonLoading] = React.useState<boolean>(false)
  const defaultPolicy: Policytype = Policytype.View
  const [currentPolicy, setCurrentPolicy] = React.useState<Policytype>(defaultPolicy)

  const podSearch = useImperativeQuery<Query, Variables>(QueryPodSearchDocument)
  const defaultOptions = suggestPods

  interface PodValue {
    label: string
    value: string
  }

  const [podValue, setPodValue] = React.useState<PodValue[]>([])
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState<PodType[]>(defaultOptions)
  const debounceTimeout = 800

  const onCleanup = (): void => {
    setVisible(false)
    setInviteButtonLoading(false)
    setPodValue([])
    setOptions(defaultOptions)
  }

  const onInviteClick = async (): Promise<void> => {
    setInviteButtonLoading(true)
    const state: ShareLinkState = ShareLinkState.Enabled
    const policy: Policytype = currentPolicy
    const input: BlockCreateShareLinkInput = {
      id: blockId,
      target: podValue.map(podValue => ({ webid: podValue.value, policy, state }))
    }
    if (podValue.length) {
      await blockCreateShareLink({ variables: { input } })
    }
    setInviteButtonLoading(false)
    setCurrentPolicy(defaultPolicy)
    setPodValue([])
    setOptions(defaultOptions)
    setVisible(false)
  }

  const onClickMenu: MenuProps['onClick'] = ({ key }): void => {
    setCurrentPolicy(key as Policytype)
  }

  const policyMessage = currentPolicy === Policytype.Edit ? t('invite.edit_message') : t('invite.view_message')

  const menu = (
    <Menu onClick={onClickMenu} selectedKeys={[currentPolicy]}>
      <Menu.Item key={Policytype.View} disabled={Policytype.View === currentPolicy}>
        {t('invite.view_message')} <br /> {t('invite.view_message_description')}
      </Menu.Item>
      <Menu.Item key={Policytype.Edit} disabled={Policytype.Edit === currentPolicy}>
        {t('invite.edit_message')} <br /> {t('invite.edit_message_description')}
      </Menu.Item>
    </Menu>
  )
  const policyDropdown = (
    <Dropdown overlay={menu} arrow={true}>
      <div>
        {policyMessage} <LineDown />
      </div>
    </Dropdown>
  )

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = async (value: string): Promise<void> => {
      setOptions([])
      setFetching(true)
      const { data } = await podSearch({ input: value })
      const pods: PodType[] = data?.podSearch ?? []
      setOptions(pods)
      setFetching(false)
    }

    return debounce(loadOptions, debounceTimeout)
  }, [podSearch])

  const { Option } = Select

  const tagRender = (props: { label: any; value: any; closable: any; onClose: any }): any => {
    const { value, closable, onClose } = props
    return (
      <Tag closable={closable} onClose={onClose} className={styles.tag}>
        {value}
      </Tag>
    )
  }

  const selectData = (
    <Select
      style={{ width: '100%' }}
      showSearch
      placeholder={t('invite.search')}
      mode="multiple"
      filterOption={false}
      labelInValue={true}
      value={podValue}
      notFoundContent={fetching ? <Spin size="small" /> : <span>{t('invite.type_hint')}</span>}
      onSearch={debounceFetcher}
      tagRender={tagRender}
      onChange={newValue => {
        setPodValue(newValue)
      }}>
      {options.map(pod => (
        <Option key={pod.webid} value={pod.webid}>
          <PodCard pod={pod} />
        </Option>
      ))}
    </Select>
  )

  const inviteContent = (
    <>
      <div>
        <Row>
          <Col span={14}>{selectData}</Col>
          <Col span={6} className={styles.center}>
            {policyDropdown}
          </Col>
          <Col span={4} className={styles.center}>
            <Button type="primary" onClick={onInviteClick} loading={inviteButtonLoading}>
              {t('invite.button')}
            </Button>
          </Col>
        </Row>

        <Divider />
        <Help />
        <span>{t('invite.learn')}</span>
      </div>
    </>
  )

  return (
    <Modal title={null} footer={null} closable={false} destroyOnClose={true} visible={visible} onOk={onCleanup} onCancel={onCleanup}>
      {inviteContent}
    </Modal>
  )
}
