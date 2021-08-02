// about fixed version 8.2.9 for preact in package.json
// that is what uppy suggests us to do.
// ref: https://uppy.io/docs/writing-plugins/#UI-Plugins
import { Plugin, Uppy, UppyFile } from '@uppy/core'
// preact type definition is conflict with React, so we import source file directly
import { html } from 'htm/preact/index.module'
import cx from 'classnames'
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
  url?: string
  emoji?: EmojiMeta
  color?: string
  meta?: {
    blobKey: string
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
  onProgress?: (progress: UploadProgress) => void
  onUploaded?: (data: UploadResultData) => void
  onFileLoaded?: (file: File) => void
  prepareFileUpload: (type: 'image' | 'pdf', file: any) => Promise<{ endpoint: string; headers: any; blobKey: string }>
  fetchUnsplashImages?: (query: string, page: number, perPage: number) => Promise<{ success: boolean; data: UnsplashImage[] }>
  fileType: 'image' | 'pdf'
  importSources: ImportSourceOption[]
}

type SourceType = 'upload' | 'link' | 'unsplash' | 'emoji' | 'gallery'

const IMPORT_SOURCE_LABEL = {
  upload: 'Upload',
  link: 'Embed link',
  unsplash: 'Unsplash',
  emoji: 'Emoji',
  gallery: 'Gallery'
}

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

    if ((this.getPluginState() as { unsplashImages: UnsplashImage[] }).unsplashImages?.length > 0) return
    void this.handleFetchUnsplashImage()
  }

  handleScrollObserve = (entities: any, observer: any) => {
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
      url: image.fullUrl
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

    this.opts.onUploaded?.({ action: 'add', url: this.link })
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
      this.uppy.log(err)
    }
  }

  handleUploadSuccess = (file: UppyFile): void => {
    this.opts.onUploaded({
      action: 'add',
      meta: {
        blobKey: this.blobKey
      }
    })
  }

  handleProgress = (file: UppyFile): void => {
    this.opts.onProgress?.(file.progress)
  }

  // TODO: handle error
  handleUpload = async (file: File): Promise<void> => {
    const { endpoint, headers, blobKey } = await this.opts.prepareFileUpload(this.opts.fileType, file)
    this.blobKey = blobKey
    this.uppy.getPlugin('XHRUpload').setOptions({
      endpoint,
      headers
    })

    this.opts?.onFileLoaded(file)

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

  renderLinkPanel(source: ImportSourceOption) {
    return html`
      <div class="uploader-dashboard-link-panel">
        <input onInput=${this.handleLinkInput} class="dashboard-link-panel-input" placeholder=${source.linkInputPlaceholder} />
        <button onClick=${this.handleLinkSubmit} class="dashboard-panel-button">${source.buttonText}</button>
        <div class="dashboard-link-panel-hint">${source.buttonHint}</div>
      </div>
    `
  }

  renderUploadPanel(source: ImportSourceOption) {
    return html`
      <div class="uploader-dashboard-upload-panel">
        <input
          class="dashboard-upload-file-input"
          ref=${input => {
            this.uploadInput = input
          }}
          type="file"
          multiple=${false}
          accept=${source.acceptType}
          onChange=${this.handleInputChange}
        />
        <button onClick=${this.handleChooseFile} class="dashboard-panel-button">${source.buttonText}</button>
      </div>
    `
  }

  renderUnsplashPanel(source: ImportSourceOption) {
    const { unsplashImages } = this.getPluginState() as { unsplashImages: UnsplashImage[] }
    return html`
      <div class="uploader-dashboard-unsplash-panel">
        <input class="dashboard-unsplash-search-input" placeholder="Search for an image..." onInput=${this.handleUnsplashSearchInput} />
        <div class="dashboard-unsplash-image-list">
          ${(unsplashImages ?? []).map(
            image => html`<div class="unsplash-image-item" onClick=${this.handleUnsplashImageSelect(image)}>
              <div style="background-image: url(${image.smallUrl})" class="unsplash-image" />
              <div class="unsplash-image-username">${image.username}</div>
            </div>`
          )}
          <div
            ref=${container => {
              this.createScrollObserver(container)
            }}
            class="unsplash-load-more-placeholder"
          />
        </div>
      </div>
    `
  }

  renderGalleryPanel(source: ImportSourceOption) {
    const COLORS = [
      '#5f5f5f',
      '#D43730',
      '#F75F48',
      '#E47F2A',
      '#A6A6A6',
      '#2CAD94',
      '#5423B9',
      '#9F0F64',
      '#FFE27D',
      'linear-gradient(180deg, #FB9393 0%, #D2B343 100%)',
      '#D78787'
    ]
    return html`
      <div class="uploader-dashboard-gallery-panel">
        <div class="dashboard-gallery-group">
          <div class="dashboard-gallery-group-name">COLOR & GRADIENT</div>
          <div class="dashboard-color-list">
            ${COLORS.map(
              item => html`
                <div class="dashboard-color-item" style="background: ${item}" onClick=${this.handleSelectColor(item, 'add')} />
              `
            )}
          </div>
        </div>
      </div>
    `
  }

  renderEmojiPanel(source: ImportSourceOption) {
    return html`
      <div class="uploader-dashboard-emoji-panel">
        <input class="dashboard-emoji-search-input" placeholder="Search for Emoji..." onInput=${this.handleSearchEmoji} />
        <div class="dashboard-emoji-section">
          ${[RECENT_GROUP, ...Object.keys(emojiData)].map(name => {
            const emojis = this.getEmojis(name)

            if (emojis.length === 0) {
              return ''
            }

            return html`
              <div class="dashboard-emoji-group">
                <div class="dashboard-emoji-group-name">${name}</div>
                <div class="dashboard-emoji-list">
                  ${emojis.map(
                    item => html`
                      <div class="dashboard-emoji-item" onClick=${this.handleSelectEmoji(item, 'add')}>
                        <span aria-label=${item.name} class="dashboard-emoji" role="img">${item.emoji}</span>
                      </div>
                    `
                  )}
                </div>
              </div>
            `
          })}
        </div>
      </div>
    `
  }

  renderActionButton(button: ActionButtonOption) {
    return html`
      <div class="dashboard-action-button" onClick=${button.onClick}>
        ${button.icon &&
        html`
          <span class="brk-icon dashboard-action-button-icon">
            <iconpark-icon name=${button.icon} />
          </span>
        `}
        <div class="dashboard-action-button-label">${button.label}</div>
      </div>
    `
  }

  // TODO: change render engine from preact to React
  render() {
    let { activeSource } = this.getPluginState() as { activeSource: ImportSourceOption }

    if (!activeSource) {
      activeSource = this.opts.importSources?.[0]
    }

    const EMOJI_ACTION_BUTTONS: ActionButtonOption[] = [
      {
        label: 'Random',
        icon: 'redo',
        onClick: this.handleRandomPickEmoji
      },
      {
        label: 'Remove',
        onClick: this.handleRemoveEmoji
      }
    ]

    const GALLERY_ACTION_BUTTONS: ActionButtonOption[] = [
      {
        label: 'Remove',
        onClick: this.handleRemoveEmoji
      }
    ]

    return html`
      <div class="brickdoc-uploader-dashboard">
        <div class="uploader-dashboard-navbar">
          ${this.opts.importSources.map(
            source => html`
              <div
                class="${cx('uploader-dashboard-navbar-item', { active: activeSource.type === source.type })}"
                onClick=${this.handleNavbarItemClick(source)}
              >
                ${source.typeLabel || IMPORT_SOURCE_LABEL[source.type]}
              </div>
            `
          )}
          <div class="uploader-dashboard-action-buttons">
            ${activeSource?.type === 'emoji' && EMOJI_ACTION_BUTTONS.map(this.renderActionButton)}
            ${activeSource?.type === 'gallery' && GALLERY_ACTION_BUTTONS.map(this.renderActionButton)}
          </div>
        </div>
        ${activeSource?.type === 'emoji' && this.renderEmojiPanel(activeSource)}
        ${activeSource?.type === 'link' && this.renderLinkPanel(activeSource)}
        ${activeSource?.type === 'upload' && this.renderUploadPanel(activeSource)}
        ${activeSource?.type === 'unsplash' && this.renderUnsplashPanel(activeSource)}
        ${activeSource?.type === 'gallery' && this.renderGalleryPanel(activeSource)}
      </div>
    `
  }
}
