/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { BlockEmoji, Blocktype } from '@/BrickdocGraphQL'
import dayjs from 'dayjs'
import { BlockWithChecked } from './TrashList'
import { Checkbox, Button, theme, ConfirmDialog } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { FilePages, Delete, Undo } from '@brickdoc/design-icons'
import { useNavigate } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Page, Time, Action, ActionButtonStyle, AvatarEmoji, SelectBlock, PageTile } from './Trash.style'

interface TrashItemProps {
  block: BlockWithChecked
  domain: string
  onChange: (checked: boolean) => void
  onDelete: (id: string) => Promise<void>
  onRestore: (id: string) => Promise<void>
}

export const TrashItem: React.FC<TrashItemProps> = ({ domain, block, onChange, onRestore, onDelete }) => {
  const { t } = useDocsI18n()
  const [actionLoading, setActionLoading] = useState(false)
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState(false)
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

  const link = `/${domain}/${block.id}`

  const onClickLink = (): void => {
    navigate(link)
  }

  const getEmoji = (path: NonNullDocMeta['pathArray'][0]): string | undefined => {
    return path.icon && path.icon.type === Blocktype.Emoji ? (path.icon as BlockEmoji).emoji : ''
  }

  const title = <span className="ellipsis">{block.text || t('title.untitled')}</span>
  const titleData =
    block.pathArray.length === 0 ? (
      <></>
    ) : (
      <div className="path ellipsis">
        {block.pathArray.map(p => `${getEmoji(p)}${p.text || t('title.untitled')}`).join(' / ')}
      </div>
    )
  const onDeleteConfrim = async () => {
    setActionLoading(true)
    await onDelete(block.id)
    setActionLoading(false)
    setHardDeleteModalVisible(false)
  }

  const onClickRestore = async () => {
    await onRestore(block.id)
  }

  const onCancelDelete = (): void => {
    setHardDeleteModalVisible(false)
    setActionLoading(false)
  }

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
        <PageTile className="ellipsis" onClick={onClickLink}>
          <div className="title">
            {avatar}
            {title}
          </div>
          {titleData}
        </PageTile>
      </Page>
      <Time>{block.deletedAt && dayjs(block.deletedAt).format('YYYY-MM-DD HH:mm:ss')}</Time>
      <Action>
        {!block.checked && (
          <>
            <Button css={ActionButtonStyle} type="text" onClick={onClickRestore}>
              <Undo />
            </Button>
            <Button css={ActionButtonStyle} type="text" onClick={() => setHardDeleteModalVisible(true)}>
              <Delete />
            </Button>
          </>
        )}
      </Action>
      <ConfirmDialog
        confirmBtnProps={{
          loading: actionLoading,
          danger: true
        }}
        confirmBtnText={t('trash.delete_confirmation_ok')}
        cancelBtnText={t('trash.delete_confirmation_cancel')}
        onCancel={onCancelDelete}
        onConfirm={onDeleteConfrim}
        open={hardDeleteModalVisible}
      >
        {t('trash.delete_confirmation_body')}
      </ConfirmDialog>
    </>
  )
}
