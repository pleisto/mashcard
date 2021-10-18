import { render, screen, fireEvent } from '@testing-library/react'
import { ImageSection } from '../ImageSection'

// See more specs in e2e test
describe('ImageSection', () => {
  const imageUrl =
    'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'

  it('matches correct snapshot', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          image: {
            key: imageUrl,
            source: 'EXTERNAL',
            width: 700,
            ratio: 1
          }
        }
      },
      extension: {
        options: {
          prepareFileUpload: () => {}
        }
      },
      updateAttributes: () => {}
    }

    const { container } = render(<ImageSection {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders pending panel when no image', () => {
    const props: any = {
      editor: {},
      node: { attrs: { image: {} } },
      extension: {
        options: {
          prepareFileUpload: () => {}
        }
      },
      updateAttributes: () => {}
    }

    render(<ImageSection {...props} />)

    expect(screen.getByText('image_section.hint')).toBeInTheDocument()
  })

  it('renders image', () => {
    const props: any = {
      editor: {},
      node: {
        attrs: {
          image: {
            key: imageUrl,
            source: 'EXTERNAL',
            width: 700,
            ratio: 1
          }
        }
      },
      extension: {
        options: {
          prepareFileUpload: () => {}
        }
      },
      updateAttributes: () => {}
    }

    render(<ImageSection {...props} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  describe('Uploader Dashboard', () => {
    it('renders uploader dashboard when click add button', () => {
      const props: any = {
        editor: {},
        node: { attrs: { image: {} } },
        extension: {
          options: {
            prepareFileUpload: () => {},
            fetchUnsplashImages: () => {}
          }
        },
        updateAttributes: () => {}
      }

      render(<ImageSection {...props} />)

      fireEvent.click(screen.getByText('image_section.hint'))

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('embeds image by paste link', () => {
      const props: any = {
        editor: {},
        node: { attrs: { image: {} } },
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

          rerender(<ImageSection {...props} />)
        }
      }

      const { rerender } = render(<ImageSection {...props} />)

      fireEvent.click(screen.getByText('image_section.hint'))
      fireEvent.input(screen.getByPlaceholderText('image_section.import_sources.link.placeholder'), {
        target: {
          value: imageUrl
        }
      })
      fireEvent.click(screen.getByText('image_section.import_sources.link.button_text'))

      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })
})
