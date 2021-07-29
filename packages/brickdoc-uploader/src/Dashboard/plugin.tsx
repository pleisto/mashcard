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
  url: string
}

export interface ImportSourceOption {
  type: SourceType
  buttonText?: string
  buttonHint?: string
  acceptType?: string
  linkInputPlaceholder?: string
}

export interface DashboardPluginOptions {
  target: HTMLElement
  onProgress?: (progress: UploadProgress) => void
  onUploaded?: (data: UploadResultData) => void
  onFileLoaded?: (file: File) => void
  prepareFileUpload: (type: 'image' | 'pdf', file: any) => Promise<{ endpoint: string; headers: any }>
  fileType: 'image' | 'pdf'
  importSources: ImportSourceOption[]
}

type SourceType = 'upload' | 'link' | 'unsplash'

const IMPORT_SOURCE_LABEL = {
  upload: 'Upload',
  link: 'Embed link',
  unsplash: 'Unsplash'
}

export class DashboardPlugin extends Plugin {
  opts: DashboardPluginOptions

  link: string

  uploadInput: HTMLInputElement

  constructor(uppy: Uppy, opts: DashboardPluginOptions) {
    super(uppy, opts)
    this.id = 'brk-dashboard'
    this.type = 'orchestrator'
    this.opts = opts
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

  handleNavbarItemClick = (activeSource: ImportSourceOption) => () => this.setPluginState({ activeSource })

  // TODO: fix type
  handleLinkInput = (event: any): void => {
    this.link = event.target.value
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
    console.log('upload success', file)
  }

  handleProgress = (file: UppyFile): void => {
    this.opts.onProgress?.(file.progress)
  }

  // TODO: handle error
  handleUpload = async (file: File): Promise<void> => {
    const { endpoint, headers } = await this.opts.prepareFileUpload(this.opts.fileType, file)
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
      </div>
    `
  }
}
