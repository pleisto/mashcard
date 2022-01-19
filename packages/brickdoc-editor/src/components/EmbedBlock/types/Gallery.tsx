import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { EmbedBlockPlaceholder } from '../Placeholder'
import { Icon, Input, Popover, styled, theme } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { BlockContainer } from '../../../components'
import { EditorContext } from '../../../context/EditorContext'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { EmbedBlockAttributes } from '../EmbedBlock'
import { UnsplashImage } from '@brickdoc/uploader'
import { debounce } from 'lodash-es'

export interface GalleryTypeEmbedBlockProps {
  deleteNode: NodeViewProps['deleteNode']
  getPos: NodeViewProps['getPos']
  node: NodeViewProps['node']
  updateEmbedBlockAttributes: (attrs: EmbedBlockAttributes, type: 'link' | 'image' | 'attachment') => void
}

const Gallery = styled('div', {
  maxHeight: '28.5rem',
  overflow: 'scroll',
  paddingBottom: '.625rem 1rem',
  width: '38.5rem'
})

const GalleryTitle = styled('div', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 600,
  lineHeight: '1.375rem',
  marginBottom: '1.125rem'
})

const GalleryImage = styled('div', {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '2px',
  cursor: 'pointer',
  filter: 'drop-shadow(0px 2px 4px rgba(44, 91, 255, 0.02)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04))',
  height: '6.5625rem',
  marginBottom: '.5rem',
  marginRight: '.5rem',
  position: 'relative',
  width: '8.75rem'
})

const GalleryImageList = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  [`${GalleryImage}:nth-child(4n)`]: {
    marginRight: 0
  }
})

const SearchInput = styled(Input, {
  marginBottom: '1rem'
})

const GalleryImageInfo = styled('div', {
  background: theme.colors.backgroundOverlayPrimary,
  borderRadius: '2px',
  bottom: 0,
  left: 0,
  opacity: 0,
  position: 'absolute',
  right: 0,
  transition: 'opacity 100ms ease-in-out',
  top: 0,
  '&:hover': {
    opacity: 1
  }
})

const GalleryImageUsername = styled('span', {
  bottom: '.5rem',
  color: theme.colors.white,
  fontSize: '.75rem',
  left: '.5rem',
  lineHeight: '1rem',
  position: 'absolute',
  textShadow: '0px 2px 4px rgba(44, 91, 255, 0.02), 0px 4px 4px rgba(0, 0, 0, 0.04)'
})

const LoadMorePlaceholder = styled('div', {})

const UNSPLASH_PER_PAGE = 20

export const GalleryTypeEmbedBlock: React.FC<GalleryTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  getPos,
  updateEmbedBlockAttributes
}) => {
  const { t } = React.useContext(EditorContext)
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const [unsplashImages, setUnsplashImages] = React.useState<UnsplashImage[]>([])
  const fetching = React.useRef(false)
  const lastQuery = React.useRef('')
  const page = React.useRef(1)

  const fetchUnsplashImage = React.useCallback(
    async (query?: string): Promise<void> => {
      if (fetching.current) {
        return
      }

      if (query && query !== lastQuery.current) {
        page.current = 1
        lastQuery.current = query
      }

      fetching.current = true

      try {
        const response = await editorDataSource.fetchUnsplashImages(lastQuery.current, page.current, UNSPLASH_PER_PAGE)

        if (response.success) {
          const prevData = page.current === 1 ? [] : unsplashImages

          setUnsplashImages([...prevData, ...response.data])
          page.current += 1
        }
      } catch (error) {
        console.error(error)
      }

      fetching.current = false
    },
    [editorDataSource, unsplashImages]
  )

  React.useEffect(() => {
    void fetchUnsplashImage()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUnsplashSearchChange = React.useCallback(
    debounce((event: any): void => {
      const query = event.target.value
      void fetchUnsplashImage(query)
    }, 300),
    []
  )

  const observeY = React.useRef<number>()

  const createScrollObserver = (ele: HTMLDivElement | null): void => {
    if (!ele) {
      return
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    new IntersectionObserver((entities): void => {
      const y = entities[0].boundingClientRect.y
      if (observeY.current && observeY.current > y) {
        void fetchUnsplashImage()
      }
      observeY.current = y
    }, options).observe(ele)
  }

  const handleSelectImage = React.useCallback(
    (item: UnsplashImage) => () => {
      updateEmbedBlockAttributes({ key: item.fullUrl, source: 'EXTERNAL' }, 'image')
    },
    [updateEmbedBlockAttributes]
  )

  return (
    <BlockContainer actionOptions={['delete']} deleteNode={deleteNode} getPos={getPos}>
      <Popover
        trigger="click"
        defaultVisible={node.attrs.isNew}
        content={
          <Gallery>
            <GalleryTitle>{t('embed_block.types.gallery.title')}</GalleryTitle>
            <SearchInput
              placeholder={t('embed_block.types.gallery.search.placeholder')}
              onChange={handleUnsplashSearchChange}
            />
            <GalleryImageList>
              {unsplashImages.map(item => (
                <GalleryImage
                  key={item.id}
                  css={{
                    backgroundImage: `url(${item.smallUrl})`
                  }}
                  onClick={handleSelectImage(item)}>
                  <GalleryImageInfo>
                    <GalleryImageUsername>{item.username}</GalleryImageUsername>
                  </GalleryImageInfo>
                </GalleryImage>
              ))}
            </GalleryImageList>
            <LoadMorePlaceholder ref={createScrollObserver} />
          </Gallery>
        }>
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
