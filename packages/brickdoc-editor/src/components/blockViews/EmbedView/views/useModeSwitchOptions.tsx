import { Preview, BookmarkView, TextView } from '@brickdoc/design-icons'
import { styled, theme } from '@brickdoc/design-system'
import { useCallback } from 'react'
import { EmbedAttributes } from '../../../../extensions/blocks/embed/meta'
import { useEditorI18n } from '../../../../hooks'
import { ToolbarOptionGroup } from '../../../ui/Toolbar'
import { EmbedBlockType } from '../EmbedView'
import { ModeSwitchProps } from './ModeSwitch'

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

export function useModeSwitchOptions(
  mode: ModeSwitchProps['mode'],
  blockType: EmbedBlockType,
  updateEmbedBlockAttributes: <T extends 'link' | 'image' | 'attachment'>(
    attrs: Partial<EmbedAttributes[T]>,
    type: T
  ) => void
): [ToolbarOptionGroup] {
  const isCard = mode === 'card'
  const isBookmark = mode === 'bookmark'
  const isText = mode === 'text'

  const [t] = useEditorI18n()
  const setToCardView = useCallback((): void => {
    updateEmbedBlockAttributes({ mode: 'preview' }, blockType)
  }, [blockType, updateEmbedBlockAttributes])

  const setToBookmarkView = useCallback((): void => {
    updateEmbedBlockAttributes({ mode: 'bookmark' }, blockType)
  }, [blockType, updateEmbedBlockAttributes])

  const setToTextView = useCallback((): void => {
    updateEmbedBlockAttributes({ mode: 'link' }, blockType)
  }, [blockType, updateEmbedBlockAttributes])

  const options: ToolbarOptionGroup = [
    {
      type: 'item',
      name: 'card',
      label: t('embed_block.view_types.card.name'),
      tooltip: t('embed_block.view_types.card.name'),
      icon: (
        <Icon active={isCard}>
          <Preview />
        </Icon>
      ),
      onAction: setToCardView,
      active: isCard
    },
    {
      type: 'item',
      name: 'bookmark',
      label: t('embed_block.view_types.bookmark.name'),
      tooltip: t('embed_block.view_types.bookmark.name'),
      icon: (
        <Icon active={isBookmark}>
          <BookmarkView />
        </Icon>
      ),
      onAction: setToBookmarkView,
      active: isBookmark
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

  return [options]
}
