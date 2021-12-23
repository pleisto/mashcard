import { render, screen, fireEvent } from '@testing-library/react'
import { EditorDataSourceContext, EditorDataSource } from '../../../dataSource/DataSource'
import { ImageBlock } from '../ImageBlock'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

// See more specs in e2e test
describe('ImageBlock', () => {
  const editorDataSource = new EditorDataSource()
  const imageUuid = 'image-uuid'
  editorDataSource.prepareFileUpload = (() => {}) as any

  const imageUrl =
    'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'

  it('matches correct snapshot', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          uuid: imageUuid,
          image: {
            key: imageUrl,
            source: 'EXTERNAL',
            width: 700,
            ratio: 1
          }
        }
      },
      extension: {
        options: {}
      },
      updateAttributes: () => {}
    }

    const { container } = render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <ImageBlock {...props} />
      </EditorDataSourceContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders pending panel when no image', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          uuid: imageUuid,
          image: {}
        }
      },
      extension: {
        options: {}
      },
      updateAttributes: () => {}
    }

    render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <ImageBlock {...props} />
      </EditorDataSourceContext.Provider>
    )

    expect(screen.getByText('image_block.hint')).toBeInTheDocument()
  })

  it('renders image', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          uuid: imageUuid,
          image: {
            key: imageUrl,
            source: 'EXTERNAL',
            width: 700,
            ratio: 1
          }
        }
      },
      extension: {},
      updateAttributes: () => {}
    }

    render(
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <ImageBlock {...props} />
      </EditorDataSourceContext.Provider>
    )

    expect(screen.getByTestId(TEST_ID_ENUM.editor.imageBlock.image.id)).toBeInTheDocument()
  })

  describe('Uploader Dashboard', () => {
    it('renders uploader dashboard when click add button', () => {
      const props: any = {
        editor: {},
        node: {
          attrs: {
            uuid: imageUuid,
            image: {}
          }
        },
        extension: {
          options: {
            prepareFileUpload: () => {},
            fetchUnsplashImages: () => {}
          }
        },
        updateAttributes: () => {}
      }

      render(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <ImageBlock {...props} />
        </EditorDataSourceContext.Provider>
      )

      fireEvent.click(screen.getByText('image_block.hint'))

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('embeds image by paste link', () => {
      const props: any = {
        editor: {},
        node: {
          attrs: {
            uuid: imageUuid,
            image: {}
          }
        },
        extension: {
          options: {
            prepareFileUpload: () => {},
            fetchUnsplashImages: () => {}
          }
        },
        updateAttributes: (attrs: any) => {
          props.node.attrs = {
            ...props.node.attrs,
            ...attrs
          }

          rerender(
            <EditorDataSourceContext.Provider value={editorDataSource}>
              <ImageBlock {...props} />
            </EditorDataSourceContext.Provider>
          )
        }
      }

      const { rerender } = render(
        <EditorDataSourceContext.Provider value={editorDataSource}>
          <ImageBlock {...props} />
        </EditorDataSourceContext.Provider>
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
