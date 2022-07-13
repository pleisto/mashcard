import { render, screen, fireEvent, act } from '@testing-library/react'
import { VirtuosoProps, GroupedVirtuosoProps } from 'react-virtuoso'
import { Dashboard, ImportSourceOption } from '../Dashboard'
import { DashboardPluginOptions } from '../plugin'
import { RECENT_EMOJI_LOCAL_STORAGE_KEY } from '../useEmoji'

jest.mock('react-virtuoso', () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function Virtuoso(props: VirtuosoProps<unknown, unknown>) {
    return <>{props.data?.map((value, index) => props.itemContent?.(index, value, undefined))}</>
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function GroupedVirtuoso(props: GroupedVirtuosoProps<unknown, unknown>) {
    return (
      <>
        {Array(props.groupCounts!.reduce((partialSum, a) => partialSum + a, 0))
          .fill(0)
          .map((value, index) => (
            <div key={index}>{props.itemContent?.(index, 0, value, undefined)}</div>
          ))}
      </>
    )
  }

  return { ...jest.requireActual('react-virtuoso'), Virtuoso, GroupedVirtuoso }
})

describe('Dashboard', () => {
  describe('Upload', () => {
    const source: ImportSourceOption = {
      type: 'upload',
      typeLabel: 'Upload Label',
      buttonText: 'Button'
    }
    const sources: ImportSourceOption[] = [source]
    const uppy: any = {
      on: () => {},
      off: () => {}
    }

    it('matches correct snapshot', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        showRemoveButton: true
      }

      const { container } = render(
        <Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it('renders correctly', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image'
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      expect(screen.getByText(source.typeLabel!)).toBeInTheDocument()
      expect(screen.getByText(source.buttonText!)).toBeInTheDocument()
    })
  })

  describe('Link', () => {
    const source: ImportSourceOption = {
      type: 'link',
      typeLabel: 'Link Label',
      buttonHint: 'Button Hint',
      buttonText: 'Button',
      linkInputPlaceholder: 'Placeholder'
    }
    const sources: ImportSourceOption[] = [source]
    const uppy: any = {}

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

    it('matches correct snapshot', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        showRemoveButton: true
      }

      const { container } = render(
        <Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it('renders correctly', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image'
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      expect(screen.getByText(source.typeLabel!)).toBeInTheDocument()
      expect(screen.getByText(source.buttonHint!)).toBeInTheDocument()
      expect(screen.getByText(source.buttonText!)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(source.linkInputPlaceholder!)).toBeInTheDocument()
    })

    it('do nothing if no link specified', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn()
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      fireEvent.click(screen.getByText(source.buttonText!))

      expect(options.onUploaded).toBeCalledTimes(0)
    })

    it('inputs link normally', async () => {
      jest.useRealTimers()
      const url = 'https://avatars.githubusercontent.com/u/41993484'
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn()
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      fireEvent.change(screen.getByPlaceholderText(source.linkInputPlaceholder!), { target: { value: url } })
      fireEvent.click(screen.getByText(source.buttonText!))
      // jest limit， can't test image load
      onloadRef!()
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(options.onUploaded).toBeCalledTimes(1)
      expect(options.onUploaded).toBeCalledWith({ action: 'add', url, meta: { source: 'external' } })
    })
  })

  describe('Gallery', () => {
    const source: ImportSourceOption = {
      type: 'gallery',
      typeLabel: 'Gallery Label'
    }
    const sources: ImportSourceOption[] = [source]
    const uppy: any = {}

    it('matches correct snapshot', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        showRemoveButton: true
      }

      const { container } = render(
        <Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />
      )

      expect(container.firstChild).toMatchSnapshot()
    })

    it('renders correctly', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image'
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      expect(screen.getByText(source.typeLabel!)).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('img')).toHaveLength(11)
    })

    it('selects color normally', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn()
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      fireEvent.click(screen.getAllByRole('img')[0])

      expect(options.onUploaded).toBeCalledTimes(1)
      expect((options.onUploaded as jest.Mock).mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "add",
            "color": "#5f5f5f",
          },
        ]
      `)
    })

    it('clicks Remove Button will trigger remove action', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn(),
        showRemoveButton: true
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      fireEvent.click(screen.getByText('Remove'))

      expect(options.onUploaded).toHaveBeenCalledTimes(1)
      expect(options.onUploaded).toBeCalledWith({ action: 'remove', color: undefined })
    })
  })

  describe('Emoji', () => {
    const source: ImportSourceOption = {
      type: 'emoji',
      typeLabel: 'Emoji Label'
    }
    const sources: ImportSourceOption[] = [source]
    const uppy: any = {}

    beforeEach(() => {
      localStorage.removeItem(RECENT_EMOJI_LOCAL_STORAGE_KEY)
    })

    it('matches correct snapshot', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        showRemoveButton: true
      }

      const { container } = render(
        <Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />
      )

      expect(container).toMatchSnapshot()
    })

    it('renders correctly', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image'
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      expect(screen.getByText(source.typeLabel!)).toBeInTheDocument()
    })

    it('searches emoji correctly', () => {
      jest.useFakeTimers()
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn()
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      act(() => {
        fireEvent.change(screen.getByPlaceholderText('Search for Emoji...'), {
          target: {
            value: 'smile'
          }
        })
        jest.runAllTimers()
      })

      const list = screen.getAllByRole('option')

      expect(list[0].textContent).toMatchInlineSnapshot(`"😼"`)
    })

    it('selects emoji item normally', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn()
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      expect(screen.getByText(source.typeLabel!)).toBeInTheDocument()
      const list = screen.getAllByRole('option')
      fireEvent.click(list[0])

      expect(options.onUploaded).toHaveBeenCalledTimes(1)
      expect((options.onUploaded as jest.Mock).mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "add",
            "emoji": Object {
              "emoji": "😀",
              "emoji_version": "1.0",
              "name": "grinning face",
              "skin_tone_support": false,
              "slug": "grinning_face",
              "unicode_version": "1.0",
            },
          },
        ]
      `)
    })

    it('clicks Remove Button will trigger remove action', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn(),
        showRemoveButton: true
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      fireEvent.click(screen.getByText('Remove'))

      expect(options.onUploaded).toHaveBeenCalledTimes(1)
      expect(options.onUploaded).toBeCalledWith({ action: 'remove', emoji: undefined })
    })
  })
})
