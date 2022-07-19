import { fireEvent, render, screen } from '@testing-library/react'
import { GalleryImage } from '../../../../../../extensions'
import { GalleryContent } from '../../../embedTypes'
import * as hooks from '../../../embedTypes/Gallery/useUnsplashImages'

jest.mock('../../../embedTypes/Gallery/useUnsplashImages')

describe('GalleryContent', () => {
  it('renders GalleryContent correctly', () => {
    const extension: any = { options: {} }
    const images: GalleryImage[] = [
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

    const { container } = render(
      <GalleryContent extension={extension} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />
    )

    expect(container).toMatchSnapshot()
  })

  it('selects image correctly', () => {
    const extension: any = { options: {} }
    const images: GalleryImage[] = [
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

    render(<GalleryContent extension={extension} updateEmbedBlockAttributes={updateEmbedBlockAttributes} />)

    fireEvent.click(screen.getByText(images[0].username))

    expect(updateEmbedBlockAttributes).toBeCalled()
  })
})
