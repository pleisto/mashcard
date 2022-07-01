import { Button, Spin, ImageWithSpin, styled, Input } from '@mashcard/design-system'
import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useBoolean } from 'ahooks'
import { debounce } from '@mashcard/active-support'
import { DashboardPluginOptions, UnsplashImage } from './plugin'
import { NotFound } from './index.style'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

interface UnsplashPanelProps {
  pluginOptions: DashboardPluginOptions
}

const UNSPLASH_PER_PAGE = 24
const IMAGES_PER_LINE = 4

const Loading = styled(Spin, {
  display: 'block',
  width: '100%',
  textAlign: 'center'
})

export const UnsplashPanel: React.FC<UnsplashPanelProps> = ({ pluginOptions }) => {
  const [unsplashImages, setUnsplashImages] = React.useState<UnsplashImage[]>([])
  const [loading, { setTrue, setFalse }] = useBoolean(false)
  const fetching = React.useRef(false)
  const lastQuery = React.useRef('')
  const page = React.useRef(1)

  const grouppedData = React.useMemo(() => {
    const lineCount = Math.ceil(unsplashImages.length / IMAGES_PER_LINE)

    // group images into lines
    const imagesByLine: UnsplashImage[][] = []
    for (let i = 0; i < lineCount; i++) {
      imagesByLine.push(unsplashImages.slice(i * IMAGES_PER_LINE, (i + 1) * IMAGES_PER_LINE))
    }
    return imagesByLine
  }, [unsplashImages])

  const handleFetchUnsplashImage = async (query?: string): Promise<void> => {
    if (fetching.current) {
      return
    }

    if (query !== undefined && query !== lastQuery.current) {
      page.current = 1
      lastQuery.current = query
    }

    fetching.current = true
    setTrue()
    try {
      const response = await pluginOptions.fetchUnsplashImages!(lastQuery.current!, page.current!, UNSPLASH_PER_PAGE)

      if (response.success) {
        const prevData = page.current === 1 ? [] : unsplashImages
        setUnsplashImages(prevData.concat(response.data))
        page.current += 1
      }
    } catch (error) {
      // https://github.com/pleisto/corp/issues/1471
      setUnsplashImages([])
    }
    setFalse()
    fetching.current = false
  }

  React.useEffect(() => {
    void handleFetchUnsplashImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUnsplashSearchInput = debounce((event: any): void => {
    const query = event.target.value
    void handleFetchUnsplashImage(query)
  }, 300)

  const handleUnsplashImageSelect = (image: UnsplashImage) => (): void => {
    pluginOptions.onUploaded?.({
      action: 'add',
      url: image.fullUrl,
      meta: {
        source: 'external'
      }
    })
  }

  const handleEndReached = (): void => {
    void handleFetchUnsplashImage()
  }

  return (
    <div className="uploader-dashboard-unsplash-panel">
      <Input
        size="sm"
        placeholder="Search for an image..."
        onChange={handleUnsplashSearchInput}
        data-testid={TEST_ID_ENUM.uploader.Dashboard.tabs.Unsplash.search.id}
      />

      <Virtuoso
        className="dashboard-unsplash-image-list"
        style={{ height: 323 }}
        defaultItemHeight={113}
        fixedItemHeight={113}
        increaseViewportBy={200}
        endReached={handleEndReached}
        data={grouppedData}
        // eslint-disable-next-line react/no-unstable-nested-components
        itemContent={(index, images) => {
          return images.map(image => (
            <Button
              type="text"
              key={image.id}
              className="unsplash-image-item"
              onClick={handleUnsplashImageSelect(image)}>
              <ImageWithSpin
                src={image.smallUrl}
                className="unsplash-image"
                blurHash={image.blurHash}
              />
              <div className="unsplash-image-username">by {image.username}</div>
            </Button>
          ))
        }}
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          Header: () => (!loading && !unsplashImages.length ? <NotFound>No result found.</NotFound> : null),
          // eslint-disable-next-line react/no-unstable-nested-components
          Footer: () => (loading ? <Loading /> : null)
        }}
      />
    </div>
  )
}
