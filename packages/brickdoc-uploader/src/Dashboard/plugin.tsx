// about fixed version 8.2.9 for preact in package.json
// that is what uppy suggests us to do.
// ref: https://uppy.io/docs/writing-plugins/#UI-Plugins
import { Plugin, Uppy } from '@uppy/core'
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

  onNavbarItemClick = (sourceType: SourceType) => () => this.setPluginState({ activeSourceType: sourceType })

  // TODO: fix type
  onLinkInput = (event: any): void => {
    this.link = event.target.value
  }

  onLinkSubmit = (): void => {
    if (!this.link) {
      return
    }

    this.opts.onUploaded?.({ url: this.link })
  }

  renderLinkPanel() {
    return html`
      <div class="uploader-dashboard-link-panel">
        <input onInput=${this.onLinkInput} class="dashboard-link-panel-input" placeholder="Paste the image link..." />
        <button onClick=${this.onLinkSubmit} class="dashboard-link-panel-button">Embed image</button>
        <div class="dashboard-link-panel-hint">Works with any image from web</div>
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
                onClick=${this.onNavbarItemClick(source.type)}
              >
                ${source.label}
              </div>
            `
          )}
        </div>
        ${activeSourceType === 'link' && this.renderLinkPanel()}
      </div>
    `
  }
}
