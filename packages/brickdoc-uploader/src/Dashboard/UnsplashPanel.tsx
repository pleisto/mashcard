import { Button, Spin, styled, theme } from '@brickdoc/design-system'
import React from 'react'
import { useBoolean } from 'ahooks'
import { debounce } from '@brickdoc/active-support'
import { DashboardPluginOptions, UnsplashImage } from './plugin'

interface UnsplashPanelProps {
  pluginOptions: DashboardPluginOptions
}

const UNSPLASH_PER_PAGE = 20

const Notfound = styled('p', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  marginTop: '1rem',
  display: 'block',
  width: '100%',
  textAlign: 'center'
})

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

  const handleFetchUnsplashImage = async (query?: string): Promise<void> => {
    if (fetching.current) {
      return
    }

    if (query && query !== lastQuery.current) {
      page.current = 1
      lastQuery.current = query
    }

    fetching.current = true
    setTrue()
    try {
      const response = await pluginOptions.fetchUnsplashImages!(lastQuery.current!, page.current!, UNSPLASH_PER_PAGE)

      if (response.success) {
        const prevData = page.current === 1 ? [] : unsplashImages
        setUnsplashImages([...prevData, ...response.data])
        page.current += 1
      }
    } catch (error) {
      // https://github.com/brickdoc/brickdoc/issues/1471
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

  const observeY = React.useRef<number>()
  const createScrollObserver = (ele: HTMLElement): void => {
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
      if (observeY.current! > y) {
        void handleFetchUnsplashImage()
      }
      observeY.current = y
    }, options).observe(ele)
  }

  const handleUnsplashImageSelect = (image: UnsplashImage) => (): void => {
    pluginOptions.onUploaded?.({
      action: 'add',
      url: image.fullUrl,
      meta: {
        source: 'external'
      }
    })
  }

  return (
    <div className="uploader-dashboard-unsplash-panel">
      <input
        className="dashboard-unsplash-search-input"
        placeholder="Search for an image..."
        onChange={handleUnsplashSearchInput}
      />

      <div className="dashboard-unsplash-image-list">
        {!loading && !unsplashImages.length && <Notfound>No result found.</Notfound>}
        {loading ? (
          <Loading />
        ) : (
          unsplashImages.map(image => (
            <Button
              type="text"
              key={image.id}
              className="unsplash-image-item"
              onClick={handleUnsplashImageSelect(image)}
            >
              <div style={{ backgroundImage: `url("${image.smallUrl}")` }} className="unsplash-image" />
              <div className="unsplash-image-username">@{image.username}</div>
            </Button>
          ))
        )}
        <div
          ref={container => {
            createScrollObserver(container!)
          }}
          className="unsplash-load-more-placeholder"
        />
      </div>
    </div>
  )
}
