import React from 'react'
import { ContextInterface } from '@brickdoc/formula'
import { DashboardPluginOptions } from '@brickdoc/uploader'
import { DatabaseRow, DatabaseRows } from '../extensions/table'
import { BlockInput } from '@brickdoc/schema'

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

export interface useDatabaseRowsReturn {
  rows: DatabaseRows
  fetchRows: (parentId: string) => Promise<void>
  addRow: (parentId: string, rowIndex?: number) => DatabaseRow
  updateRows: (parentId: string, rows: DatabaseRows) => Promise<void>
  removeRow: (rowId: string) => void
  moveRow: (parentId: string, fromIndex: number, toIndex: number) => DatabaseRow | undefined
}

export interface EditorDatabase {
  // define data here

  fetchUnsplashImages: Exclude<DashboardPluginOptions['fetchUnsplashImages'], undefined>

  fetchWebsiteMeta: (url: string) => Promise<{ success: boolean; data: WebsiteMeta }>

  prepareFileUpload: Exclude<DashboardPluginOptions['prepareFileUpload'], undefined>

  formulaContext?: ContextInterface | null

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

  updateBlocks: (blocks: BlockInput[], toDeleteIds: string[]) => Promise<void>

  useDatabaseRows: (options: {
    updateBlocks: (blocks: BlockInput[], toDeleteIds: string[]) => Promise<void>
  }) => useDatabaseRowsReturn
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
    prepareFileUpload() {
      throw new Error('prepareFileUpload unimplement.')
    },
    fetchWebsiteMeta() {
      throw new Error('fetchWebsiteMeta unimplement.')
    },
    fetchUnsplashImages() {
      throw new Error('fetchUnsplashImages unimplement.')
    },
    updateBlocks() {
      throw new Error('updateBlocks unimplement.')
    },
    useDatabaseRows() {
      throw new Error('useDatabaseRows unimplement.')
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

  get formulaContext(): EditorDatabase['formulaContext'] {
    return this.database.formulaContext
  }

  set formulaContext(value: EditorDatabase['formulaContext']) {
    this.database.formulaContext = value
    this.invokeListeners('formulaContext')
  }

  get updateBlocks(): EditorDatabase['updateBlocks'] {
    return this.database.updateBlocks
  }

  set updateBlocks(value: EditorDatabase['updateBlocks']) {
    this.database.updateBlocks = value
    this.invokeListeners('updateBlocks')
  }

  get useDatabaseRows(): EditorDatabase['useDatabaseRows'] {
    return this.database.useDatabaseRows
  }

  set useDatabaseRows(value: EditorDatabase['useDatabaseRows']) {
    this.database.useDatabaseRows = value
    this.invokeListeners('useDatabaseRows')
  }

  get rootId(): EditorDatabase['rootId'] {
    return this.database.rootId
  }

  set rootId(value: EditorDatabase['rootId']) {
    this.database.rootId = value
    this.invokeListeners('rootId')
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
