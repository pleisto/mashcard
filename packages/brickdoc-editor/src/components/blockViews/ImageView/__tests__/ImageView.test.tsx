import { render, screen, fireEvent } from '@testing-library/react'
import { ImageView } from '../ImageView'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { ExternalProps, ExternalPropsContext } from '../../../../context'
import { mockBlockViewProps } from '../../common/tests'
import { ImageOptions, ImageAttributes } from '../../../../extensions/blocks/image/meta'

describe('ImageView', () => {
  const externalProps = new ExternalProps()
  const imageUuid = 'image-uuid'
  externalProps.rootId = imageUuid
  externalProps.prepareFileUpload = (() => {}) as any

  const imageUrl =
    'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'

  it('matches correct snapshot', () => {
    const props = mockBlockViewProps<ImageOptions, ImageAttributes>({
      node: {
        uuid: imageUuid,
        attrs: {
          image: {
            type: 'IMAGE',
            key: imageUrl,
            source: 'EXTERNAL',
            width: 700,
            ratio: 1
          }
        }
      }
    })

    const { container } = render(
      <ExternalPropsContext.Provider value={externalProps}>
        <ImageView {...props} />
      </ExternalPropsContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders pending panel when no image', () => {
    const props = mockBlockViewProps<ImageOptions, ImageAttributes>({
      node: {
        uuid: imageUuid,
        attrs: {
          image: {
            type: 'IMAGE'
          }
        }
      }
    })

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <ImageView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByText('image_block.hint')).toBeInTheDocument()
  })

  it('renders image', () => {
    const props = mockBlockViewProps<ImageOptions, ImageAttributes>({
      node: {
        uuid: imageUuid,
        attrs: {
          image: {
            type: 'IMAGE',
            key: imageUrl,
            source: 'EXTERNAL',
            width: 700,
            ratio: 1
          }
        }
      }
    })

    render(
      <ExternalPropsContext.Provider value={externalProps}>
        <ImageView {...props} />
      </ExternalPropsContext.Provider>
    )

    expect(screen.getByTestId(TEST_ID_ENUM.editor.imageBlock.image.id)).toBeInTheDocument()
  })

  describe('Uploader Dashboard', () => {
    it('renders uploader dashboard when click add button', () => {
      const props = mockBlockViewProps<ImageOptions, ImageAttributes>({
        node: {
          uuid: imageUuid,
          attrs: {
            image: {
              type: 'IMAGE'
            }
          }
        },
        extension: {
          options: {
            prepareFileUpload: () => {},
            fetchUnsplashImages: () => {}
          }
        }
      })

      render(
        <ExternalPropsContext.Provider value={externalProps}>
          <ImageView {...props} />
        </ExternalPropsContext.Provider>
      )

      fireEvent.click(screen.getByText('image_block.hint'))

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('embeds image by paste link', () => {
      const props = mockBlockViewProps<ImageOptions, ImageAttributes>({
        node: {
          uuid: imageUuid,
          attrs: {
            image: {
              type: 'IMAGE'
            }
          }
        },
        extension: {
          options: {
            prepareFileUpload: () => {},
            fetchUnsplashImages: () => {}
          }
        },
        onUpdateAttributes: () => {
          rerender(
            <ExternalPropsContext.Provider value={externalProps}>
              <ImageView {...props} />
            </ExternalPropsContext.Provider>
          )
        }
      })

      const { rerender } = render(
        <ExternalPropsContext.Provider value={externalProps}>
          <ImageView {...props} />
        </ExternalPropsContext.Provider>
      )

      fireEvent.click(screen.getByText('image_block.hint'))
      fireEvent.input(screen.getByPlaceholderText('image_block.import_sources.link.placeholder'), {
        target: {
          value: imageUrl
        }
      })
      fireEvent.click(screen.getByText('image_block.import_sources.link.button_text'))

      expect(screen.getByTestId(TEST_ID_ENUM.editor.imageBlock.image.id)).toBeInTheDocument()
    })
  })
})
