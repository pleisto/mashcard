import { render, screen, fireEvent } from '@testing-library/react'
import { ImageView } from '../ImageView'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { EditorPropsContext } from '../../../../context'
import { mockBlockViewProps } from '../../../../test'
import { ImageOptions, ImageAttributes } from '../../../../extensions/blocks/image/meta'
import * as editorPropsHooks from '../../../../hooks/useEditorPropsContext'

describe('ImageView', () => {
  const editorProps = { ...EditorPropsContext }
  const imageUuid = 'image-uuid'
  editorProps.rootId = imageUuid
  editorProps.prepareFileUpload = (() => {}) as any

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
    jest.spyOn(editorPropsHooks, 'useEditorPropsContext').mockImplementation(() => editorProps)

    const { container } = render(<ImageView {...props} />)
    expect(container).toMatchSnapshot()
  })

  let onloadRef: Function | undefined
  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        return this._onload
      },
      set(onload: Function) {
        onloadRef = onload
        this._onload = onload
      }
    })
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
    jest.spyOn(editorPropsHooks, 'useEditorPropsContext').mockImplementation(() => editorProps)

    render(<ImageView {...props} />)

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
    jest.spyOn(editorPropsHooks, 'useEditorPropsContext').mockImplementation(() => editorProps)

    render(<ImageView {...props} />)

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
      jest.spyOn(editorPropsHooks, 'useEditorPropsContext').mockImplementation(() => editorProps)

      render(<ImageView {...props} />)

      fireEvent.click(screen.getByText('image_block.hint'))

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('embeds image by paste link', async () => {
      jest.useRealTimers()
      jest.spyOn(editorPropsHooks, 'useEditorPropsContext').mockImplementation(() => editorProps)
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
          rerender(<ImageView {...props} />)
        }
      })

      const { rerender } = render(<ImageView {...props} />)

      fireEvent.click(screen.getByText('image_block.hint'))
      fireEvent.input(screen.getByPlaceholderText('image_block.import_sources.link.placeholder'), {
        target: {
          value: imageUrl
        }
      })
      fireEvent.click(screen.getByText('image_block.import_sources.link.button_text'))
      // jest limit， can't test image load
      onloadRef!()
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(screen.getByTestId(TEST_ID_ENUM.editor.imageBlock.image.id)).toBeInTheDocument()
    })
  })
})
