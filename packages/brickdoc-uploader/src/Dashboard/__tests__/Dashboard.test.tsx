import { render, screen, fireEvent } from '@testing-library/react'
import { Dashboard, ImportSourceOption } from '../Dashboard'
import { DashboardPluginOptions } from '../plugin'
import { RECENT_EMOJI_LOCAL_STORAGE_KEY } from '../useEmoji'

describe('Dashboard', () => {
  beforeAll(() => {
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn()
    })) as any
  })

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
        fileType: 'image'
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

    it('matches correct snapshot', () => {
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image'
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

    it('inputs link normally', () => {
      const url = 'url'
      const options: DashboardPluginOptions = {
        target: {} as any,
        importSources: sources,
        fileType: 'image',
        onUploaded: jest.fn()
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      fireEvent.change(screen.getByPlaceholderText(source.linkInputPlaceholder!), { target: { value: url } })
      fireEvent.click(screen.getByText(source.buttonText!))

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
        fileType: 'image'
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
        onUploaded: jest.fn()
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
        fileType: 'image'
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
      expect(screen.getByRole('group')).toBeInTheDocument()
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
      const list = screen.getByRole('list')
      fireEvent.click(list.firstChild!)

      expect(screen.getAllByRole('group')).toHaveLength(2)
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
        onUploaded: jest.fn()
      }

      render(<Dashboard pluginId="dashboard" importSources={sources} pluginOptions={options} uppy={uppy} />)

      fireEvent.click(screen.getByText('Remove'))

      expect(options.onUploaded).toHaveBeenCalledTimes(1)
      expect(options.onUploaded).toBeCalledWith({ action: 'remove', emoji: {} })
    })
  })
})
