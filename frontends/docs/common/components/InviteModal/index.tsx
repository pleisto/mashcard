import React from 'react'
import {
  cx,
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Icon,
  Select,
  DeprecatedSpin,
  Tag
} from '@brickdoc/design-system'
import { useDocsI18n } from '../../hooks'
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
import { debounce } from '@brickdoc/active-support'
import styles from './index.module.less'
import { useImperativeQuery } from '@/common/hooks'
import { PodCard, PodType } from '@/common/components/PodCard'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
interface InviteModalProps {
  docMeta: NonNullDocMeta
  visible: boolean
  suggestPods: PodType[]
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const InviteModal: React.FC<InviteModalProps> = ({ docMeta, visible, setVisible, suggestPods }) => {
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
      id: docMeta.id,
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

  const onClickMenu: MenuProps['onAction'] = (key): void => {
    setCurrentPolicy(key as Policytype)
  }

  const policyMessage = currentPolicy === Policytype.Edit ? t('invite.edit_message') : t('invite.view_message')

  const menu = (
    <Menu onAction={onClickMenu}>
      <Menu.Item
        label={t('invite.view_message')}
        description={t('invite.view_message_description')}
        active={currentPolicy === Policytype.View}
        className={styles.menuItem}
        itemKey={Policytype.View}
      />
      <Menu.Item
        label={t('invite.edit_message')}
        description={t('invite.edit_message_description')}
        active={currentPolicy === Policytype.Edit}
        className={styles.menuItem}
        itemKey={Policytype.Edit}
      />
    </Menu>
  )
  const policyDropdown = (
    <Dropdown placement="bottomStart" className={styles.policyDropdown} overlay={menu}>
      <div>
        {policyMessage} <Icon.LineDown />
      </div>
    </Dropdown>
  )

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = async (value: string): Promise<void> => {
      setOptions([])
      setFetching(true)
      const { data } = await podSearch({ input: value })
      const pods: PodType[] = data?.podSearch?.filter(pod => pod.webid !== docMeta.webid) ?? []
      setOptions(pods)
      setFetching(false)
    }

    return debounce(loadOptions, debounceTimeout)
  }, [podSearch, docMeta.webid])

  const { Option } = Select

  const tagRender = (props: { label: any; value: any; closable: any; onClose: any }): React.ReactElement => {
    const { value, closable, onClose } = props
    return <Tag closable={closable} onClose={onClose} text={value} />
  }

  const dropdownRender = (node: React.ReactElement): React.ReactElement => (
    <div className={styles.options}>
      {options.length > 0 && <div className={styles.head}>Select a person</div>}
      {node}
    </div>
  )

  const inviteListRef = React.useRef<HTMLDivElement>(null)

  const selectData = (
    <Select
      className={styles.select}
      showSearch
      placeholder={t('invite.search')}
      mode="multiple"
      filterOption={false}
      labelInValue={true}
      value={podValue}
      notFoundContent={fetching ? <DeprecatedSpin size="small" /> : <span>{t('invite.type_hint')}</span>}
      getPopupContainer={() => inviteListRef.current!}
      dropdownClassName={styles.selectDropdown}
      dropdownRender={dropdownRender}
      onSearch={debounceFetcher}
      tagRender={tagRender}
      open={true}
      onChange={newValue => {
        setPodValue(newValue)
      }}
    >
      {options.map(pod => (
        <Option key={pod.webid} value={pod.webid}>
          <PodCard pod={pod} />
        </Option>
      ))}
    </Select>
  )

  const inviteContent = (
    <>
      <div className={styles.header}>
        <div className={cx(styles.input, { [styles.filled]: podValue.length > 0 })}>
          {selectData}
          {policyDropdown}
          <Button className={styles.inviteButton} type="primary" onClick={onInviteClick} loading={inviteButtonLoading}>
            {t(podValue.length ? 'invite.confirm_button' : 'invite.button')}
          </Button>
        </div>
      </div>

      <div ref={inviteListRef} className={styles.inviteList}>
        <span className={styles.placeholder}>{t('invite.type_hint')}</span>
      </div>

      <div className={styles.footer}>
        <Icon.Help />
        <span>{t('invite.learn')}</span>
      </div>
    </>
  )

  return (
    <Modal
      open={visible}
      onClose={onCleanup}
      dialogCss={{
        padding: '0'
      }}
    >
      {inviteContent}
    </Modal>
  )
}
