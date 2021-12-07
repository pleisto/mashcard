import ReactDOM from 'react-dom'
import { Plugin, Uppy } from '@uppy/core'
import findDOMElement from '@uppy/utils/lib/findDOMElement'
import { Dashboard } from './Dashboard'
import './index.less'

export interface UploadProgress {
  bytesTotal: number
  bytesUploaded: number
  name: string
  percentage: number
}

export interface EmojiMeta {
  emoji: string
  skin_tone_support: boolean
  name: string
  slug: string
  unicode_version: string
  emoji_version: string
}

export interface UploadResultData {
  action: 'add' | 'remove'
  signedId?: string
  viewUrl?: string
  downloadUrl?: string
  url?: string
  emoji?: EmojiMeta
  color?: string
  meta?: {
    name?: string
    size?: number
    source: 'origin' | 'external'
  }
}

export interface ImportSourceOption {
  type: SourceType
  typeLabel?: string
  buttonText?: string
  buttonHint?: string
  acceptType?: string
  linkInputPlaceholder?: string
}

export interface ActionButtonOption {
  icon?: string
  label: string
  onClick?: VoidFunction
}

export interface UnsplashImage {
  id: string
  width: number
  height: number
  fullUrl: string
  smallUrl: string
  username: string
}

export interface DashboardPluginOptions {
  target: HTMLElement
  blockId?: string
  onProgress?: (progress: UploadProgress) => void
  onUploaded?: (data: UploadResultData) => void
  onFileLoaded?: (file: File) => void
  prepareFileUpload?: (
    blockId: string,
    type: 'image' | 'pdf',
    file: any
  ) => Promise<{ endpoint: string; headers: any; blobKey: string; signedId: string; downloadUrl: string; viewUrl: string }>
  fetchUnsplashImages?: (query: string, page: number, perPage: number) => Promise<{ success: boolean; data: UnsplashImage[] }>
  fileType: 'image' | 'pdf'
  importSources: ImportSourceOption[]
}

export type SourceType = 'upload' | 'link' | 'unsplash' | 'emoji' | 'gallery'

export class DashboardPlugin extends Plugin {
  opts: DashboardPluginOptions

  constructor(uppy: Uppy, opts: DashboardPluginOptions) {
    super(uppy, opts)
    this.id = 'brk-dashboard'
    this.type = 'orchestrator'
    this.opts = opts
  }

  install(): void {
    const { target } = this.opts

    if (target) {
      this.mount(target, this as any)
    }
  }

  uninstall(): void {
    this.unmount()
  }

  mount(target, plugin): void {
    const callerPluginName = plugin.id

    const targetElement = findDOMElement(target)

    if (targetElement) {
      // API for plugins that require a synchronous rerender.
      // this.rerender = (state) => {
      //   // plugin could be removed, but this.rerender is debounced below,
      //   // so it could still be called even after uppy.removePlugin or uppy.close
      //   // hence the check
      //   if (!this.uppy.getPlugin(this.id)) return
      //   this.el = preact.render(this.render(state), targetElement, this.el)
      //   this.afterUpdate()
      // }
      // this._updateUI = debounce(this.rerender)

      this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`)

      ReactDOM.render(this.render(), targetElement)
    }
  }

  render(): JSX.Element {
    return <Dashboard importSources={this.opts.importSources} pluginOptions={this.opts} uppy={this.uppy} pluginId={this.id} />
  }
}
