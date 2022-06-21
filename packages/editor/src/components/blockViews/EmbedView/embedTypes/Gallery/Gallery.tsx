import { FC, useCallback, useRef } from 'react'
import { Icon, ImageWithSpin, Popover, Spin } from '@mashcard/design-system'
import { UnsplashImage } from '@mashcard/uploader'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { EmbedBlockPlaceholder } from '../../Placeholder'
import { BlockContainer } from '../../../BlockContainer'
import { UpdateEmbedBlockAttributes } from '../../EmbedView'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { usePopoverVisible } from '../usePopoverVisible'
import {
  Gallery,
  GalleryImage,
  GalleryImageInfo,
  GalleryImageList,
  GalleryImageUsername,
  LoadMorePlaceholder,
  SearchInput
} from './Gallery.style'
import { useEditorI18n } from '../../../../../hooks'
import { useUnsplashImages } from './useUnsplashImages'

export interface GalleryTypeEmbedBlockProps {
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  extension: EmbedViewProps['extension']
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

export const GalleryContent: FC<Pick<GalleryTypeEmbedBlockProps, 'updateEmbedBlockAttributes' | 'extension'>> = ({
  extension,
  updateEmbedBlockAttributes
}) => {
  const [t] = useEditorI18n()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [unsplashImages, fetching, handleUnsplashSearch] = useUnsplashImages(loadMoreRef, extension)

  const handleSelectImage = useCallback(
    (item: UnsplashImage) => () => {
      updateEmbedBlockAttributes({ key: item.fullUrl, source: 'EXTERNAL' }, 'image')
    },
    [updateEmbedBlockAttributes]
  )

  return (
    <Gallery>
      <SearchInput placeholder={t('embed_block.types.gallery.search.placeholder')} onChange={handleUnsplashSearch} />
      <GalleryImageList>
        {unsplashImages.map(item => (
          <GalleryImage key={item.id} onClick={handleSelectImage(item)}>
            <ImageWithSpin src={item.smallUrl} />
            <GalleryImageInfo>
              <GalleryImageUsername>{item.username}</GalleryImageUsername>
            </GalleryImageInfo>
          </GalleryImage>
        ))}
        {fetching && <Spin />}
        <LoadMorePlaceholder ref={loadMoreRef} />
      </GalleryImageList>
    </Gallery>
  )
}

export const GalleryTypeEmbedBlock: FC<GalleryTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  getPos,
  extension,
  updateEmbedBlockAttributes
}) => {
  const [t] = useEditorI18n()
  const [popoverVisible, handlePopoverVisibleChange] = usePopoverVisible(node.attrs.uuid)

  return (
    <BlockContainer node={node} actionOptions={['delete']} deleteNode={deleteNode} getPos={getPos}>
      <Popover
        visible={popoverVisible}
        trigger="click"
        getPopupContainer={c => c}
        compact={true}
        onVisibleChange={handlePopoverVisibleChange}
        content={<GalleryContent extension={extension} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />}>
        <EmbedBlockPlaceholder
          data-testid={TEST_ID_ENUM.editor.embedBlock.addButton.id}
          icon={<Icon.Unsplash />}
          label={t('embed_block.types.gallery.label')}
          description={t('embed_block.types.gallery.description')}
        />
      </Popover>
    </BlockContainer>
  )
}
