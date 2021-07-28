// about fixed version 8.2.9 for preact in package.json
// that is what uppy suggests us to do.
// ref: https://uppy.io/docs/writing-plugins/#UI-Plugins
import { Plugin, Uppy, UppyFile } from '@uppy/core'
// preact type definition is conflict with React, so we import source file directly
import { html } from 'htm/preact/index.module'
import cx from 'classnames'
import './index.less'

export interface UploadResultData {
  url: string
}

export interface DashboardPluginOptions {
  target: HTMLElement
  onUploaded?: (data: UploadResultData) => void
  prepareFileUpload: (type: 'image', file: any) => Promise<{ endpoint: string; headers: any }>
}

type SourceType = 'upload' | 'link' | 'unsplash'

interface ImportSource {
  type: SourceType
  label: string
}

export class DashboardPlugin extends Plugin {
  opts: DashboardPluginOptions

  importSources: ImportSource[] = [
    {
      type: 'upload',
      label: 'Upload'
    },
    {
      type: 'link',
      label: 'Embed link'
    },
    {
      type: 'unsplash',
      label: 'Unsplash'
    }
  ]

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
      this.mount(target, this as any)
      this.setPluginState({ activeSourceType: 'upload' })
    }
  }

  uninstall(): void {
    this.uppy.off('upload-success', this.handleUploadSuccess)
    this.unmount()
  }

  handleNavbarItemClick = (sourceType: SourceType) => () => this.setPluginState({ activeSourceType: sourceType })

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

  // TODO: handle error
  handleUpload = async (file: File): Promise<void> => {
    const { endpoint, headers } = await this.opts.prepareFileUpload('image', file)
    this.uppy.getPlugin('XHRUpload').setOptions({
      endpoint,
      headers
    })

    this.uppy.on('upload-success', this.handleUploadSuccess)

    const setUploadLink = (result: any): void => {
      this.opts.onUploaded?.({ url: result })
    }
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = function onload() {
      setUploadLink(this.result)
    }
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

  renderLinkPanel() {
    return html`
      <div class="uploader-dashboard-link-panel">
        <input onInput=${this.handleLinkInput} class="dashboard-link-panel-input" placeholder="Paste the image link..." />
        <button onClick=${this.handleLinkSubmit} class="dashboard-panel-button">Embed image</button>
        <div class="dashboard-link-panel-hint">Works with any image from web</div>
      </div>
    `
  }

  renderUploadPanel() {
    return html`
      <div class="uploader-dashboard-upload-panel">
        <input
          class="dashboard-upload-file-input"
          ref=${input => {
            this.uploadInput = input
          }}
          type="file"
          multiple=${false}
          accept="image/*"
          onChange=${this.handleInputChange}
        />
        <button onClick=${this.handleChooseFile} class="dashboard-panel-button">Choose an image</button>
      </div>
    `
  }

  // TODO: change render engine from preact to React
  render() {
    const { activeSourceType } = this.getPluginState() as { activeSourceType: SourceType }

    return html`
      <div class="brickdoc-uploader-dashboard">
        <div class="uploader-dashboard-navbar">
          ${this.importSources.map(
            source => html`
              <div
                class="${cx('uploader-dashboard-navbar-item', { active: activeSourceType === source.type })}"
                onClick=${this.handleNavbarItemClick(source.type)}
              >
                ${source.label}
              </div>
            `
          )}
        </div>
        ${activeSourceType === 'link' && this.renderLinkPanel()} ${activeSourceType === 'upload' && this.renderUploadPanel()}
      </div>
    `
  }
}
