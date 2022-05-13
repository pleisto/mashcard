import { debounce, uniqBy } from '@brickdoc/active-support'
import { UnsplashImage } from '@brickdoc/uploader'
import { useState, useRef, useCallback, useEffect, ChangeEvent, RefObject } from 'react'
import { useExternalProps } from '../../../../../hooks'

const UNSPLASH_PER_PAGE = 20

export function useUnsplashImages(
  loadMoreRef: RefObject<HTMLDivElement>
): [UnsplashImage[], boolean, (event: ChangeEvent<HTMLInputElement>) => void] {
  const externalProps = useExternalProps()
  const [unsplashImages, setUnsplashImages] = useState<UnsplashImage[]>([])
  const [fetching, setFetching] = useState(false)

  const lastQuery = useRef('')
  const page = useRef(1)

  const fetchUnsplashImage = useCallback(
    async (query?: string): Promise<void> => {
      if (fetching) return

      if (query && query !== lastQuery.current) {
        page.current = 1
        lastQuery.current = query
      }

      setFetching(true)

      try {
        const response = await externalProps.fetchUnsplashImages(lastQuery.current, page.current, UNSPLASH_PER_PAGE)

        if (response.success) {
          setUnsplashImages(prevData => uniqBy([...(page.current === 1 ? [] : prevData), ...response.data], 'id'))
          page.current += 1
        }
      } catch (error) {
        console.error(error)
      }

      setFetching(false)
    },
    [externalProps, fetching]
  )

  const observeY = useRef<number>()

  useEffect(() => {
    const ele = loadMoreRef.current
    if (!ele) return

    void fetchUnsplashImage()

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver((entities): void => {
      const y = entities[0].boundingClientRect.y
      if (observeY.current! > y) {
        void fetchUnsplashImage()
      }
      observeY.current = y
    }, options)

    observer.observe(ele)

    return () => observer.unobserve(ele)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUnsplashSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>): void => {
      const query = event.target.value
      setUnsplashImages([])
      void fetchUnsplashImage(query)
    }, 300),
    []
  )

  return [unsplashImages, fetching, handleUnsplashSearch]
}
