import React from 'react'
import { ContextInterface } from '@brickdoc/formula'
import { DashboardPluginOptions } from '@brickdoc/uploader'
import { BrickdocEventBus, ExplorerMenuGroup, ExplorerMenuTrigger, Preview_Box } from '@brickdoc/schema'

export interface WebsiteMeta {
  url: string
  title?: string
  description?: string
  cover?: string | null
  icon?: string
}

export interface Collaborator {
  name: string | null | undefined
  webid: string
  avatar: string | undefined
}

export interface DocumentPageData {
  key: string
  value: string
  parentId: string | null | undefined
  sort: number
  icon: string | null
  nextSort: number
  firstChildSort: number
  text: string
  title: string | undefined
}

export interface EditorDatabase {
  // define data here

  fetchUnsplashImages: Exclude<DashboardPluginOptions['fetchUnsplashImages'], undefined>

  fetchWebsiteMeta: (url: string) => Promise<{ success: boolean; data: Omit<Preview_Box, '__typename'> }>

  prepareFileUpload: Exclude<DashboardPluginOptions['prepareFileUpload'], undefined>

  renderPageTree: () => React.ReactElement | null

  formulaContext?: ContextInterface | null

  explorerMenu: {
    show: (items: ExplorerMenuGroup[]) => void
    hide: () => void
  }

  blobs: {
    [blockKey: string]: Array<{
      key: string
      url: string
    }>
  }

  documentPages: DocumentPageData[]

  documentEditable: boolean

  collaborators: Collaborator[]

  webid: string

  rootId: string
}

export type DataSourceListenerType = keyof EditorDatabase
export type DataSourceListener = (type: DataSourceListenerType) => void

export class EditorDataSource {
  private database: EditorDatabase = {
    webid: '',
    rootId: '',
    documentEditable: false,
    blobs: {},
    collaborators: [],
    documentPages: [],
    explorerMenu: {
      show: (items: ExplorerMenuGroup[]) => {
        BrickdocEventBus.dispatch(ExplorerMenuTrigger({ visible: true, items }))
      },
      hide: () => {
        BrickdocEventBus.dispatch(ExplorerMenuTrigger({ visible: false }))
      }
    },
    renderPageTree() {
      return null
    },
    prepareFileUpload() {
      throw new Error('prepareFileUpload unimplement.')
    },
    fetchWebsiteMeta() {
      throw new Error('fetchWebsiteMeta unimplement.')
    },
    fetchUnsplashImages() {
      throw new Error('fetchUnsplashImages unimplement.')
    }
  }

  private listeners: DataSourceListener[] = []

  private invokeListeners(type: DataSourceListenerType): void {
    this.listeners.forEach(listener => {
      listener(type)
    })
  }

  public source(): EditorDatabase {
    return this.database
  }

  public onUpdate(listener: DataSourceListener): VoidFunction {
    this.listeners.push(listener)

    return () => {
      this.listeners = this.listeners.filter(f => f !== listener)
    }
  }

  public merge(dataSource: EditorDataSource): void {
    this.database = {
      ...this.source(),
      ...dataSource.source()
    }
  }

  get renderPageTree(): EditorDatabase['renderPageTree'] {
    return this.database.renderPageTree
  }

  set renderPageTree(value: EditorDatabase['renderPageTree']) {
    this.database.renderPageTree = value
    this.invokeListeners('renderPageTree')
  }

  get formulaContext(): EditorDatabase['formulaContext'] {
    return this.database.formulaContext
  }

  set formulaContext(value: EditorDatabase['formulaContext']) {
    this.database.formulaContext = value
    this.invokeListeners('formulaContext')
  }

  get rootId(): EditorDatabase['rootId'] {
    return this.database.rootId
  }

  set rootId(value: EditorDatabase['rootId']) {
    this.database.rootId = value
    this.invokeListeners('rootId')
  }

  get explorerMenu(): EditorDatabase['explorerMenu'] {
    return this.database.explorerMenu
  }

  get documentEditable(): EditorDatabase['documentEditable'] {
    return this.database.documentEditable
  }

  set documentEditable(value: EditorDatabase['documentEditable']) {
    this.database.documentEditable = value
    this.invokeListeners('documentEditable')
  }

  get webid(): EditorDatabase['webid'] {
    return this.database.webid
  }

  set webid(value: EditorDatabase['webid']) {
    this.database.webid = value
    this.invokeListeners('webid')
  }

  get blobs(): EditorDatabase['blobs'] {
    return this.database.blobs
  }

  set blobs(value: EditorDatabase['blobs']) {
    this.database.blobs = value
    this.invokeListeners('blobs')
  }

  get documentPages(): EditorDatabase['documentPages'] {
    return this.database.documentPages
  }

  set documentPages(value: EditorDatabase['documentPages']) {
    this.database.documentPages = value
    this.invokeListeners('documentPages')
  }

  get collaborators(): EditorDatabase['collaborators'] {
    return this.database.collaborators
  }

  set collaborators(value: EditorDatabase['collaborators']) {
    this.database.collaborators = value
    this.invokeListeners('collaborators')
  }

  get prepareFileUpload(): EditorDatabase['prepareFileUpload'] {
    return this.database.prepareFileUpload
  }

  set prepareFileUpload(value: EditorDatabase['prepareFileUpload']) {
    this.database.prepareFileUpload = value
    this.invokeListeners('prepareFileUpload')
  }

  get fetchWebsiteMeta(): EditorDatabase['fetchWebsiteMeta'] {
    return this.database.fetchWebsiteMeta
  }

  set fetchWebsiteMeta(value: EditorDatabase['fetchWebsiteMeta']) {
    this.database.fetchWebsiteMeta = value
    this.invokeListeners('fetchWebsiteMeta')
  }

  get fetchUnsplashImages(): EditorDatabase['fetchUnsplashImages'] {
    return this.database.fetchUnsplashImages
  }

  set fetchUnsplashImages(value: EditorDatabase['fetchUnsplashImages']) {
    this.database.fetchUnsplashImages = value
    this.invokeListeners('fetchUnsplashImages')
  }
}

export const EditorDataSourceContext = React.createContext<EditorDataSource>(new EditorDataSource())
