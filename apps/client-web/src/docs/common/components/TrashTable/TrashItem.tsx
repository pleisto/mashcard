/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import {
  BlockEmoji,
  BlockRestoreInput,
  Blocktype,
  useBlockRestoreMutation,
  useBlockHardDeleteMutation,
  BlockHardDeleteInput
} from '@/BrickdocGraphQL'
import dayjs from 'dayjs'
import { BlockWithChecked } from './TrashList'
import { Checkbox, Button, ConfirmDialog, theme } from '@brickdoc/design-system'
import React from 'react'
import { FilePages, Delete, Undo } from '@brickdoc/design-icons'
import { useNavigate } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { queryPageBlocks, queryTrashBlocks } from '../../graphql'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { useApolloClient } from '@apollo/client'
import { Page, Time, Action, ActionButtonStyle, AvatarEmoji, SelectBlock } from './Trash.style'

interface TrashItemProps {
  block: BlockWithChecked
  domain: string
  onChange: (checked: boolean) => void
}

export const TrashItem: React.FC<TrashItemProps> = ({ domain, block, onChange }) => {
  const { t } = useDocsI18n()
  const client = useApolloClient()

  // TODO support image type
  const avatar = (
    <AvatarEmoji>
      {block.meta.icon?.type === Blocktype.Emoji ? (
        (block.meta.icon as BlockEmoji).emoji
      ) : (
        <FilePages size="1.25rem" color={theme.colors.typeThirdary.value} />
      )}
    </AvatarEmoji>
  )

  const navigate = useNavigate()
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = React.useState<boolean>(false)
  const [hardDeleteConfirmLoading, setHardDeleteConfirmLoading] = React.useState<boolean>(false)

  const [restoreButtonLoading, setRestoreButtonLoading] = React.useState<boolean>(false)

  const [blockHardDelete] = useBlockHardDeleteMutation({ refetchQueries: [queryTrashBlocks] })
  const [blockRestore] = useBlockRestoreMutation({ refetchQueries: [queryTrashBlocks, queryPageBlocks] })

  const link = `/${domain}/${block.id}`

  const onClickLink = (): void => {
    navigate(link)
  }

  const onRestore = async (): Promise<void> => {
    setRestoreButtonLoading(true)
    const input: BlockRestoreInput = { ids: [block.id] }
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

  const onCancelDelete = (): void => {
    setHardDeleteModalVisible(false)
    setHardDeleteConfirmLoading(false)
  }

  const onConfirmDelete = async (): Promise<void> => {
    setHardDeleteConfirmLoading(true)
    const input: BlockHardDeleteInput = { ids: [block.id] }
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
      <p className="path">{block.pathArray.map(p => `${getEmoji(p)}${p.text || t('title.untitled')}`).join(' / ')}</p>
    )

  return (
    <>
      <Page>
        <SelectBlock checked={!!block.checked}>
          <Checkbox
            checked={!!block.checked}
            onChange={onChange as any}
            noLabel
            checkboxStyle={
              block.checked ? undefined : { border: '2px solid', borderColor: theme.colors.overlaySecondary.value }
            }
            style={{ background: theme.colors.white.value }}
          />
        </SelectBlock>
        <div onClick={onClickLink}>
          <p className="title">
            {avatar}
            {title}
          </p>
          {titleData}
        </div>
      </Page>
      {/* TODO: May need to add creator or holder concept later */}
      <Time>{block.deletedAt && dayjs(block.deletedAt).format('YYYY-MM-DD HH:mm:ss')}</Time>
      <Action>
        {!block.checked && (
          <>
            <Button css={ActionButtonStyle} type="text" loading={restoreButtonLoading} onClick={onRestore}>
              <Undo />
            </Button>
            <Button
              css={ActionButtonStyle}
              type="text"
              onClick={() => {
                setHardDeleteModalVisible(true)
              }}
            >
              <Delete />
            </Button>
          </>
        )}
      </Action>
      <ConfirmDialog
        confirmBtnProps={{
          loading: hardDeleteConfirmLoading,
          danger: true
        }}
        confirmBtnText={t('trash.delete_confirmation_ok')}
        cancelBtnText={t('trash.delete_confirmation_cancel')}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
        open={hardDeleteModalVisible}
      >
        {t('trash.delete_confirmation_body')}
      </ConfirmDialog>
    </>
  )
}
