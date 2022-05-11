import { Preview, BookmarkView, TextView, Edit, Link, ScreenFull } from '@brickdoc/design-icons'
import { Input, Popover, Spin, styled, theme } from '@brickdoc/design-system'
import { ChangeEventHandler, FC, useCallback, useState } from 'react'
import { useEditorI18n } from '../../../../hooks'
import { ToolbarOptionGroup } from '../../../ui/Toolbar'
import { useLinkValue } from '../embedTypes/Link/useLinkValue'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../EmbedView'
import { EmbedToolbarProps } from './EmbedToolbar'

const Icon = styled('span', {
  variants: {
    active: {
      true: {
        color: theme.colors.primaryDefault
      },
      false: {}
    }
  }
})

const InputDivider = styled('div', {
  background: theme.colors.dividerOverlayThirdary,
  height: '1px'
})

const EditPanelContainer = styled('div', {
  padding: '.8rem 1rem'
})

const EditField = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row'
})

const EditInput = styled(Input, {
  variants: {
    size: {
      md: {
        flex: '1 !important',
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  }
})

export function useDisplayName(
  blockType: EmbedBlockType,
  displayName: string,
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
): [string, ChangeEventHandler<HTMLInputElement>, VoidFunction] {
  const [editDisplayName, setEditDisplayName] = useState(displayName)
  const onDisplayNameChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    setEditDisplayName(event.target.value)
  }, [])

  const onSubmitDisplayName = useCallback(() => {
    if (displayName === editDisplayName) return
    updateEmbedBlockAttributes({ displayName: editDisplayName }, blockType)
  }, [blockType, displayName, editDisplayName, updateEmbedBlockAttributes])

  return [editDisplayName, onDisplayNameChange, onSubmitDisplayName]
}

export const EditPanel: FC<{
  link: string
  displayName: string
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}> = ({ link, displayName, blockType, updateEmbedBlockAttributes }) => {
  const [editDisplayName, onDisplayNameChange, onSubmitDisplayName] = useDisplayName(
    blockType,
    displayName,
    updateEmbedBlockAttributes
  )
  const [editLink, onLinkChange, , onSubmitLink, progress] = useLinkValue(updateEmbedBlockAttributes, link)

  return (
    <EditPanelContainer>
      <EditInput
        onPressEnter={onSubmitDisplayName}
        bordered={false}
        size="md"
        value={editDisplayName}
        onChange={onDisplayNameChange}
      />
      <InputDivider />
      <EditField>
        <EditInput
          onPressEnter={onSubmitLink}
          bordered={false}
          size="md"
          prefix={<Link />}
          value={editLink}
          onChange={onLinkChange}
        />
        {progress.percentage > 0 && progress.percentage !== 1 && <Spin />}
      </EditField>
    </EditPanelContainer>
  )
}

export function useEmbedToolbarOptions({
  mode,
  blockType,
  displayName,
  url,
  updateEmbedBlockAttributes,
  onFullScreen
}: EmbedToolbarProps): [ToolbarOptionGroup] {
  const isPreview = mode === 'preview'
  const isCard = mode === 'card'
  const isText = mode === 'text'

  const [t] = useEditorI18n()
  const setToPreviewView = useCallback((): void => {
    updateEmbedBlockAttributes({ mode: 'preview' }, blockType)
  }, [blockType, updateEmbedBlockAttributes])

  const setToCardView = useCallback((): void => {
    updateEmbedBlockAttributes({ mode: 'card' }, blockType)
  }, [blockType, updateEmbedBlockAttributes])

  const setToTextView = useCallback((): void => {
    updateEmbedBlockAttributes({ mode: 'text' }, blockType)
  }, [blockType, updateEmbedBlockAttributes])

  const options: ToolbarOptionGroup = [
    {
      type: 'group',
      items: [
        {
          type: 'item',
          name: 'preview',
          label: t('embed_block.view_types.preview.name'),
          tooltip: t('embed_block.view_types.preview.name'),
          icon: (
            <Icon active={isPreview}>
              <Preview />
            </Icon>
          ),
          onAction: setToPreviewView,
          active: isPreview
        },
        {
          type: 'item',
          name: 'card',
          label: t('embed_block.view_types.card.name'),
          tooltip: t('embed_block.view_types.card.name'),
          icon: (
            <Icon active={isCard}>
              <BookmarkView />
            </Icon>
          ),
          onAction: setToCardView,
          active: isCard
        },
        {
          type: 'item',
          name: 'text',
          label: t('embed_block.view_types.text.name'),
          tooltip: t('embed_block.view_types.text.name'),
          icon: (
            <Icon active={isText}>
              <TextView />
            </Icon>
          ),
          onAction: setToTextView,
          active: isText
        }
      ]
    },
    {
      type: 'group',
      items: [
        {
          type: 'item',
          name: 'edit',
          tooltip: t('embed_block.edit.tooltip'),
          icon: (
            <Popover
              compact={true}
              placement="bottom"
              trigger="click"
              content={
                <EditPanel
                  blockType={blockType}
                  updateEmbedBlockAttributes={updateEmbedBlockAttributes}
                  displayName={displayName}
                  link={url}
                />
              }>
              <Edit />
            </Popover>
          )
        }
      ]
    }
  ]

  if (typeof onFullScreen === 'function') {
    options.push({
      type: 'group',
      items: [
        {
          type: 'item',
          name: 'full_screen',
          tooltip: t('embed_block.full_screen.tooltip'),
          icon: <ScreenFull />,
          onAction: onFullScreen
        }
      ]
    })
  }

  return [options]
}
