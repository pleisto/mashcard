import { UnsplashImage } from '@brickdoc/uploader'
import { fireEvent, render, screen } from '@testing-library/react'
import { GalleryContent } from '../../../embedTypes'
import * as hooks from '../../../embedTypes/Gallery/useUnsplashImages'

describe('GalleryContent', () => {
  it('renders GalleryContent correctly', () => {
    const images: UnsplashImage[] = [
      {
        id: 'id',
        smallUrl: 'smallUrl',
        fullUrl: 'fullUrl',
        username: 'username',
        width: 100,
        height: 100,
        blurHash: 'LRE3@]RkxYV@00t7IVt7nNoL%2WV'
      }
    ]

    jest.spyOn(hooks, 'useUnsplashImages').mockImplementation(() => [images, true, () => {}])
    const updateEmbedBlockAttributes = jest.fn()

    const { container } = render(<GalleryContent updateEmbedBlockAttributes={updateEmbedBlockAttributes} />)

    expect(container).toMatchSnapshot()
  })

  it('selects image correctly', () => {
    const images: UnsplashImage[] = [
      {
        id: 'id',
        smallUrl: 'smallUrl',
        fullUrl: 'fullUrl',
        username: 'username',
        width: 100,
        height: 100,
        blurHash: 'LRE3@]RkxYV@00t7IVt7nNoL%2WV'
      }
    ]

    jest.spyOn(hooks, 'useUnsplashImages').mockImplementation(() => [images, true, () => {}])
    const updateEmbedBlockAttributes = jest.fn()

    render(<GalleryContent updateEmbedBlockAttributes={updateEmbedBlockAttributes} />)

    fireEvent.click(screen.getByText(images[0].username))

    expect(updateEmbedBlockAttributes).toBeCalled()
  })
})
