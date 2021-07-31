// about fixed version 8.2.9 for preact in package.json
// that is what uppy suggests us to do.
// ref: https://uppy.io/docs/writing-plugins/#UI-Plugins
import { Plugin, Uppy, UppyFile } from '@uppy/core'
// preact type definition is conflict with React, so we import source file directly
import { html } from 'htm/preact/index.module'
import cx from 'classnames'
import './index.less'

export type UploadProgress = UppyFile['progress']

export interface UploadResultData {
  url?: string
  meta?: {
    blobKey: string
  }
}

export interface ImportSourceOption {
  type: SourceType
  buttonText?: string
  buttonHint?: string
  acceptType?: string
  linkInputPlaceholder?: string
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

type SourceType = 'upload' | 'link' | 'unsplash'

const IMPORT_SOURCE_LABEL = {
  upload: 'Upload',
  link: 'Embed link',
  unsplash: 'Unsplash'
}

const UNSPLASH_PER_PAGE = 20

export class DashboardPlugin extends Plugin {
  opts: DashboardPluginOptions

  link: string

  uploadInput: HTMLInputElement

  blobKey: string

  unsplashPage: number
  unsplashFetching: boolean
  unsplashQuery: string
  unsplashSearchThrottleTimer: any
  observeY: number

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

  // TODO: fix type
  handleUnsplashSearchInput = (event: any): void => {
    const query = event.target.value
    clearTimeout(this.unsplashSearchThrottleTimer)
    this.unsplashSearchThrottleTimer = setTimeout(() => {
      void this.handleFetchUnsplashImage(query)
    }, 300)
  }

  handleUnsplashImageSelect = (image: UnsplashImage) => (): void => {
    this.opts?.onUploaded({
      url: image.fullUrl
    })
  }

  handleLinkSubmit = (): void => {
    if (!this.link) {
      return
    }

    this.opts.onUploaded?.({ url: this.link })
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

  renderUnsplashPanel(activeSource) {
    const { unsplashImages } = this.getPluginState() as { unsplashImages: UnsplashImage[] }
    return html`
      <div class="uploader-dashboard-unsplash-panel">
        <input class="dashboard-unsplash-search-input" placeholder="Search for an image..." onChange=${this.handleUnsplashSearchInput} />
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

  // TODO: change render engine from preact to React
  render() {
    let { activeSource } = this.getPluginState() as { activeSource: ImportSourceOption }

    if (!activeSource) {
      activeSource = this.opts.importSources?.[0]
    }

    return html`
      <div class="brickdoc-uploader-dashboard">
        <div class="uploader-dashboard-navbar">
          ${this.opts.importSources.map(
            source => html`
              <div
                class="${cx('uploader-dashboard-navbar-item', { active: activeSource.type === source.type })}"
                onClick=${this.handleNavbarItemClick(source)}
              >
                ${IMPORT_SOURCE_LABEL[source.type]}
              </div>
            `
          )}
        </div>
        ${activeSource?.type === 'link' && this.renderLinkPanel(activeSource)}
        ${activeSource?.type === 'upload' && this.renderUploadPanel(activeSource)}
        ${activeSource?.type === 'unsplash' && this.renderUnsplashPanel(activeSource)}
      </div>
    `
  }
}
