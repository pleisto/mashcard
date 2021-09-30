import React from 'react'
import ReactDOM from 'react-dom'
import { Plugin, Uppy, UppyFile } from '@uppy/core'
import findDOMElement from '@uppy/utils/lib/findDOMElement'
import { Dashboard } from './Dashboard'
import emojiData from './data-by-group.json'
import './index.less'

export type UploadProgress = UppyFile['progress']

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
  ) => Promise<{ endpoint: string; headers: any; blobKey: string; signedId: string; viewUrl: string }>
  fetchUnsplashImages?: (query: string, page: number, perPage: number) => Promise<{ success: boolean; data: UnsplashImage[] }>
  fileType: 'image' | 'pdf'
  importSources: ImportSourceOption[]
}

export type SourceType = 'upload' | 'link' | 'unsplash' | 'emoji' | 'gallery'

const UNSPLASH_PER_PAGE = 20

const RECENT_GROUP = 'RECENT'
const RECENT_EMOJI_LOCAL_STORAGE_KEY = 'brickdoc-uploader-recent-emoji'

const debounce = <T,>(delay: number, callback: (params: T) => void): ((params: T) => void) => {
  let timer
  return event => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(event)
    }, delay)
  }
}

export class DashboardPlugin extends Plugin {
  opts: DashboardPluginOptions

  link: string

  uploadInput: HTMLInputElement

  blobKey: string
  viewUrl: string
  signedId: string

  unsplashPage: number
  unsplashFetching: boolean
  unsplashQuery: string
  observeY: number

  // TODO: fix type
  handleUnsplashSearchInput = debounce(300, (event: any): void => {
    const query = event.target.value
    void this.handleFetchUnsplashImage(query)
  })

  handleSearchEmoji = debounce(200, (event: any): void => {
    const search = event.target.value
    this.setPluginState({
      emojiSearch: search
    })
  })

  constructor(uppy: Uppy, opts: DashboardPluginOptions) {
    super(uppy, opts)
    this.id = 'brk-dashboard'
    this.type = 'orchestrator'
    this.opts = opts
    this.unsplashPage = 1
    this.unsplashFetching = false
    this.unsplashQuery = ''
  }

  install(): void {
    const { target } = this.opts

    if (target) {
      this.uppy.on('upload-success', this.handleUploadSuccess)
      this.uppy.on('upload-progress', this.handleProgress)
      this.mount(target, this as any)
      this.initializeRecentEmojis()
    }
  }

  uninstall(): void {
    this.uppy.off('upload-success', this.handleUploadSuccess)
    this.uppy.off('upload-progress', this.handleProgress)
    this.unmount()
  }

  handleNavbarItemClick = (activeSource: ImportSourceOption) => () => {
    this.setPluginState({ activeSource })

    if (activeSource.type !== 'unsplash' || (this.getPluginState() as { unsplashImages: UnsplashImage[] }).unsplashImages?.length > 0)
      return
    void this.handleFetchUnsplashImage()
  }

  handleScrollObserve = (entities: any, observer: any): void => {
    const y = entities[0].boundingClientRect.y
    if (this.observeY > y) {
      void this.handleFetchUnsplashImage()
    }

    this.observeY = y
  }

  createScrollObserver = (ele: HTMLElement): void => {
    if (!ele) {
      return
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(this.handleScrollObserve, options)

    observer.observe(ele)
  }

  handleFetchUnsplashImage = async (query?: string): Promise<void> => {
    if (this.unsplashFetching) {
      return
    }

    if (query && query !== this.unsplashQuery) {
      this.unsplashPage = 1
      this.unsplashQuery = query
    }

    this.unsplashFetching = true

    try {
      const response = await this.opts?.fetchUnsplashImages(this.unsplashQuery, this.unsplashPage, UNSPLASH_PER_PAGE)

      if (response.success) {
        const prevData =
          (this.unsplashPage === 1 ? [] : (this.getPluginState() as { unsplashImages: UnsplashImage[] }).unsplashImages) ?? []
        this.setPluginState({
          unsplashImages: [...prevData, ...response.data]
        })
        this.unsplashPage += 1
      }
    } catch (error) {
      console.error(error)
    }

    this.unsplashFetching = false
  }

  // TODO: fix type
  handleLinkInput = (event: any): void => {
    this.link = event.target.value
  }

  handleUnsplashImageSelect = (image: UnsplashImage) => (): void => {
    this.opts?.onUploaded({
      action: 'add',
      url: image.fullUrl,
      meta: {
        source: 'external'
      }
    })
  }

  handleSelectEmoji = (emoji: EmojiMeta, action: UploadResultData['action']) => () => {
    this.updateRecentEmojis(emoji)
    this.opts.onUploaded?.({ emoji, action })
  }

  handleSelectColor = (color: string, action: UploadResultData['action']) => () => {
    this.opts.onUploaded?.({ color, action })
  }

  handleLinkSubmit = (): void => {
    if (!this.link) {
      return
    }

    this.opts.onUploaded?.({ action: 'add', url: this.link, meta: { source: 'external' } })
  }

  handleChooseFile = (): void => {
    this.uploadInput.click()
  }

  addFile = (file: File): void => {
    const descriptor = {
      source: this.id,
      name: file.name,
      type: file.type,
      data: file
    }

    try {
      this.uppy.addFile(descriptor)
    } catch (err) {
      this.uppy.log(err as string)
    }
  }

  handleUploadSuccess = (file: UppyFile): void => {
    this.opts.onUploaded({
      action: 'add',
      url: this.blobKey,
      signedId: this.signedId,
      viewUrl: this.viewUrl,
      meta: {
        source: 'origin'
      }
    })
  }

  handleProgress = (file: UppyFile): void => {
    this.opts.onProgress?.(file.progress)
  }

  // TODO: handle error
  handleUpload = async (file: File): Promise<void> => {
    const { endpoint, headers, blobKey, viewUrl, signedId } = await this.opts.prepareFileUpload?.(
      this.opts.blockId,
      this.opts.fileType,
      file
    )
    this.blobKey = blobKey
    this.viewUrl = viewUrl
    this.signedId = signedId
    this.uppy.getPlugin('XHRUpload').setOptions({
      endpoint,
      headers
    })

    this.opts.onFileLoaded?.(file)

    await this.uppy.upload()
  }

  // TODO: fix type
  handleInputChange = async (event): Promise<void> => {
    this.uppy.log('[FileInput] Something selected through input...')
    const file = event.target.files[0]
    // We clear the input after a file is selected, because otherwise
    // change event is not fired in Chrome and Safari when a file
    // with the same name is selected.
    event.target.value = null

    this.addFile(file)
    await this.handleUpload(file)
  }

  initializeRecentEmojis = (): void => {
    let recentEmojis = []
    try {
      recentEmojis = JSON.parse(localStorage.getItem(RECENT_EMOJI_LOCAL_STORAGE_KEY))
    } catch {
      // ignore error
    }

    this.setPluginState({
      recentEmojis
    })
  }

  updateRecentEmojis = (newEmoji?: EmojiMeta): void => {
    if (!newEmoji) return

    const prevEmojis = (this.getPluginState() as { recentEmojis: EmojiMeta[] }).recentEmojis ?? []

    if (prevEmojis.find(emoji => emoji.name === newEmoji.name)) {
      return
    }

    const recentEmojis = [newEmoji, ...prevEmojis].slice(0, 24)
    this.setPluginState({
      recentEmojis
    })
    localStorage.setItem(RECENT_EMOJI_LOCAL_STORAGE_KEY, JSON.stringify(recentEmojis))
  }

  getEmojis = (name: string): EmojiMeta[] => {
    const pluginState = this.getPluginState()

    let data: EmojiMeta[] = []
    if (name === RECENT_GROUP) {
      data = (pluginState as { recentEmojis: EmojiMeta[] }).recentEmojis ?? []
    } else {
      data = emojiData[name]
    }

    const search = (pluginState as { emojiSearch: string }).emojiSearch

    if (!search) return data

    return data.filter(emoji => emoji.name.includes(search))
  }

  handleRandomPickEmoji = (): void => {
    const data = Object.values(emojiData).flat()
    const emoji = data[Math.floor(Math.random() * data.length)]

    this.handleSelectEmoji(emoji, 'add')()
  }

  handleRemoveEmoji = (): void => {
    this.handleSelectEmoji(null, 'remove')()
  }

  handleRemoveGalleryImage = (): void => {
    this.handleSelectColor(null, 'remove')()
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
