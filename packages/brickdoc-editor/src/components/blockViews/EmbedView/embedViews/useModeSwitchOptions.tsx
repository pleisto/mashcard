import { Preview, BookmarkView, TextView } from '@brickdoc/design-icons'
import { styled, theme } from '@brickdoc/design-system'
import { useCallback } from 'react'
import { EmbedAttributes, EmbedViewMode } from '../../../../extensions/blocks/embed/meta'
import { useEditorI18n } from '../../../../hooks'
import { ToolbarOptionGroup } from '../../../ui/Toolbar'
import { EmbedBlockType } from '../EmbedView'

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
  mode: EmbedViewMode,
  blockType: EmbedBlockType,
  updateEmbedBlockAttributes: <T extends 'link' | 'image' | 'attachment'>(
    attrs: Partial<EmbedAttributes[T]>,
    type: T
  ) => void
): [ToolbarOptionGroup] {
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

  return [options]
}
