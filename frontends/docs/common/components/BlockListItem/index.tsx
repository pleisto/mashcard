/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

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
import { useNavigate } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { queryPageBlocks, queryTrashBlocks } from '../../graphql'
import styles from './BlockListItem.module.less'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'

interface BlockListItemProps {
  block: Block
  webid: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const BlockListItem: React.FC<BlockListItemProps> = ({ webid, block, setVisible }) => {
  const { t } = useDocsI18n()

  // TODO support image type
  const avatar = block.meta.icon?.type === Blocktype.Emoji ? (block.meta.icon as BlockEmoji).emoji : <FilePages />

  const navigate = useNavigate()
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false)
  const [hardDeleteConfirmLoading, setHardDeleteConfirmLoading] = React.useState<boolean>(false)

  const [restoreButtonLoading, setRestoreButtonLoading] = React.useState<boolean>(false)

  const [blockHardDelete] = useBlockHardDeleteMutation({ refetchQueries: [queryTrashBlocks] })
  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryTrashBlocks, queryPageBlocks] })

  const link = `/${webid}/${block.id}`

  const onClickLink = (): void => {
    setVisible(false)
    navigate(link)
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

  const getEmoji = (path: NonNullDocMeta['pathArray'][0]): string | undefined => {
    return path.icon && path.icon.type === Blocktype.Emoji ? (path.icon as BlockEmoji).emoji : ''
  }

  const title = block.text || t('title.untitled')
  const titleData =
    block.pathArray.length === 0 ? (
      <></>
    ) : (
      <p className={styles.subTitle}>
        {block.pathArray.map(p => `${getEmoji(p)}${p.text || t('title.untitled')}`).join(' / ')}
      </p>
    )

  return (
    <div className={styles.popoverTrash} onClick={onClickLink}>
      <div className={styles.content}>
        <Avatar className={styles.avatar} src={avatar} />
        <div className={styles.titleWarp}>
          <p className={styles.title}>{title}</p>
          {titleData}
        </div>
      </div>
      <div className={styles.action}>
        <Button className={styles.button} type="text" loading={restoreButtonLoading} onClick={onRestore}>
          <Undo />
        </Button>
        <Button
          type="text"
          className={styles.button}
          onClick={() => {
            setHardDeleteModalVisible(true)
          }}
        >
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
        visible={hardDeleteModalVisible}
      >
        {t('trash.delete_confirmation_body')}
      </Modal>
    </div>
  )
}
