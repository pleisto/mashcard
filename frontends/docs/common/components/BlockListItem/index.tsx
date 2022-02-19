/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Block, BlockEmoji, BlockRestoreInput, Blocktype, useBlockRestoreMutation } from '@/BrickdocGraphQL'
import { Avatar, Button } from '@brickdoc/design-system'
import React from 'react'
import { FilePages, Delete, Undo } from '@brickdoc/design-icons'
import { useNavigate } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { queryPageBlocks, queryTrashBlocks } from '../../graphql'
import styles from './BlockListItem.module.less'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { useApolloClient } from '@apollo/client'

interface BlockListItemProps {
  block: Block
  domain: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const BlockListItem: React.FC<BlockListItemProps> = ({ domain, block, setVisible }) => {
  const { t } = useDocsI18n()
  const client = useApolloClient()

  // TODO support image type
  const avatar = block.meta.icon?.type === Blocktype.Emoji ? (block.meta.icon as BlockEmoji).emoji : <FilePages />

  const navigate = useNavigate()

  const [restoreButtonLoading, setRestoreButtonLoading] = React.useState<boolean>(false)

  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryTrashBlocks, queryPageBlocks] })

  const link = `/${domain}/${block.id}`

  const onClickLink = (): void => {
    setVisible(false)
    navigate(link)
  }

  const onRestore = async (): Promise<void> => {
    setRestoreButtonLoading(true)
    const input: BlockRestoreInput = { id: block.id }
    await blockRestore({ variables: { input } })
    client.cache.modify({
      id: client.cache.identify({ __typename: 'BlockInfo', id: block.id }),
      fields: {
        isDeleted() {
          return false
        }
      }
    })
    setRestoreButtonLoading(false)
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
        <Button type="text" className={styles.button}>
          <Delete />
        </Button>
      </div>
    </div>
  )
}
