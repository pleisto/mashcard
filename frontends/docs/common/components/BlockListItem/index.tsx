import {
  Block,
  BlockEmoji,
  BlockHardDeleteInput,
  BlockRestoreInput,
  Blocktype,
  useBlockHardDeleteMutation,
  useBlockRestoreMutation
} from '@/BrickdocGraphQL'
import { Avatar, Button, Modal } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { FilePages, Delete, Undo } from '@brickdoc/design-system/components/icon'
import { useHistory } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { queryPageBlocks, queryTrashBlocks } from '../../graphql'
import styles from './BlockListItem.module.css'

interface BlockListItemProps {
  block: Block
  webid: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const BlockListItem: React.FC<BlockListItemProps> = ({ webid, block, setVisible }) => {
  const { t } = useDocsI18n()

  // TODO support image type
  const avatar = block.meta.icon?.type === Blocktype.Emoji ? (block.meta.icon as BlockEmoji).emoji : <FilePages />

  const history = useHistory()
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false)
  const [hardDeleteConfirmLoading, setHardDeleteConfirmLoading] = React.useState<boolean>(false)

  const [restoreButtonLoading, setRestoreButtonLoading] = React.useState<boolean>(false)

  const [blockHardDelete] = useBlockHardDeleteMutation({ refetchQueries: [queryTrashBlocks] })
  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryTrashBlocks, queryPageBlocks] })

  const link = `/${webid}/p/${block.id}`

  const onClickLink = (): void => {
    setVisible(false)
    history.push(link)
  }

  const onRestore = async (): Promise<void> => {
    setRestoreButtonLoading(true)
    const input: BlockRestoreInput = { id: block.id }
    await blockRestore({ variables: { input } })
    setRestoreButtonLoading(false)
  }

  const onCancelDelete = (): void => {
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
  }

  const onConfirmDelete = async (): Promise<void> => {
    setHardDeleteConfirmLoading(true)
    const input: BlockHardDeleteInput = { id: block.id }
    await blockHardDelete({ variables: { input } })
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
  }

  const title = block.text || t('title.untitled')
  const titleData =
    block.pathArray.length === 0 ? (
      <> {title} </>
    ) : (
      <>
        {title}
        <br />
        {block.pathArray.map(p => p.text || t('title.untitled')).join(' / ')}
      </>
    )

  return (
    <>
      <Avatar className={styles.avatar} icon={avatar} />
      <Button className={styles.title} type="text" onClick={onClickLink}>
        {titleData}
      </Button>
      <div className={styles.action}>
        <Button className={styles.button} type="text" loading={restoreButtonLoading} onClick={onRestore}>
          <Undo />
        </Button>
        <Button
          type="text"
          className={styles.button}
          onClick={() => {
            setHardDeleteModalVisible(true)
          }}>
          <Delete />
        </Button>
      </div>
      <Modal
        title={null}
        okText={t('trash.delete_confirmation_ok')}
        cancelText={t('trash.delete_confirmation_cancel')}
        closable={false}
        destroyOnClose={true}
        confirmLoading={hardDeleteConfirmLoading}
        onCancel={onCancelDelete}
        onOk={onConfirmDelete}
        visible={hardDeleteModalVisible}>
        {t('trash.delete_confirmation_body')}
      </Modal>
    </>
  )
}
