import { createContext, ReactElement } from 'react'
import { ContextInterface } from '@brickdoc/formula'
import { DashboardPluginOptions } from '@brickdoc/uploader'
import { Preview_Box, Block } from '@brickdoc/schema'

export interface WebsiteMeta {
  url: string
  title?: string
  description?: string
  cover?: string | null
  icon?: string
}

export interface SpaceMember {
  name: string | null | undefined
  domain: string
  avatar: string | undefined
}

export interface Collaborator {
  name: string | null | undefined
  domain: string
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

export interface ExternalDatabase {
  // define data here

  blocks: Block[]

  featureFlags: Record<string, boolean>

  settings: Record<string, any>

  fetchUnsplashImages: Exclude<DashboardPluginOptions['fetchUnsplashImages'], undefined>

  fetchWebsiteMeta: (url: string) => Promise<{ success: boolean; data: Omit<Preview_Box, '__typename'> }>

  prepareFileUpload: Exclude<DashboardPluginOptions['prepareFileUpload'], undefined>

  renderPageTree: () => ReactElement | null

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

  spaceMembers: SpaceMember[]

  domain: string

  rootId: string

  pageQuery: URLSearchParams | null
}

export type ExternalPropsListenerType = keyof ExternalDatabase
export type ExternalPropsListener = (type: ExternalPropsListenerType) => void

export class ExternalProps {
  private database: ExternalDatabase = {
    blocks: [],
    domain: '',
    rootId: '',
    pageQuery: null,
    documentEditable: false,
    blobs: {},
    settings: {},
    featureFlags: {},
    collaborators: [],
    spaceMembers: [],
    documentPages: [],
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

  private listeners: ExternalPropsListener[] = []

  private invokeListeners(type: ExternalPropsListenerType): void {
    this.listeners.forEach(listener => {
      listener(type)
    })
  }

  public props(): ExternalDatabase {
    return this.database
  }

  public onUpdate(listener: ExternalPropsListener): VoidFunction {
    this.listeners.push(listener)

    return () => {
      this.listeners = this.listeners.filter(f => f !== listener)
    }
  }

  public merge(externalProps: ExternalProps): void {
    this.database = {
      ...this.props(),
      ...externalProps.props()
    }
  }

  get blocks(): ExternalDatabase['blocks'] {
    return this.database.blocks
  }

  set blocks(value: ExternalDatabase['blocks']) {
    this.database.blocks = value
    this.invokeListeners('blocks')
  }

  get renderPageTree(): ExternalDatabase['renderPageTree'] {
    return this.database.renderPageTree
  }

  set renderPageTree(value: ExternalDatabase['renderPageTree']) {
    this.database.renderPageTree = value
    this.invokeListeners('renderPageTree')
  }

  get formulaContext(): ExternalDatabase['formulaContext'] {
    return this.database.formulaContext
  }

  set formulaContext(value: ExternalDatabase['formulaContext']) {
    this.database.formulaContext = value
    this.invokeListeners('formulaContext')
  }

  get featureFlags(): ExternalDatabase['featureFlags'] {
    return this.database.featureFlags
  }

  set featureFlags(value: ExternalDatabase['featureFlags']) {
    this.database.featureFlags = value
    this.invokeListeners('featureFlags')
  }

  get settings(): ExternalDatabase['settings'] {
    return this.database.settings
  }

  set settings(value: ExternalDatabase['settings']) {
    this.database.settings = value
    this.invokeListeners('settings')
  }

  get rootId(): ExternalDatabase['rootId'] {
    return this.database.rootId
  }

  set rootId(value: ExternalDatabase['rootId']) {
    this.database.rootId = value
    this.invokeListeners('rootId')
  }

  get documentEditable(): ExternalDatabase['documentEditable'] {
    return this.database.documentEditable
  }

  set documentEditable(value: ExternalDatabase['documentEditable']) {
    this.database.documentEditable = value
    this.invokeListeners('documentEditable')
  }

  get domain(): ExternalDatabase['domain'] {
    return this.database.domain
  }

  set domain(value: ExternalDatabase['domain']) {
    this.database.domain = value
    this.invokeListeners('domain')
  }

  get blobs(): ExternalDatabase['blobs'] {
    return this.database.blobs
  }

  set blobs(value: ExternalDatabase['blobs']) {
    this.database.blobs = value
    this.invokeListeners('blobs')
  }

  get documentPages(): ExternalDatabase['documentPages'] {
    return this.database.documentPages
  }

  set documentPages(value: ExternalDatabase['documentPages']) {
    this.database.documentPages = value
    this.invokeListeners('documentPages')
  }

  get spaceMembers(): ExternalDatabase['spaceMembers'] {
    return this.database.spaceMembers
  }

  set spaceMembers(value: ExternalDatabase['spaceMembers']) {
    this.database.spaceMembers = value
    this.invokeListeners('spaceMembers')
  }

  get collaborators(): ExternalDatabase['collaborators'] {
    return this.database.collaborators
  }

  set collaborators(value: ExternalDatabase['collaborators']) {
    this.database.collaborators = value
    this.invokeListeners('collaborators')
  }

  get prepareFileUpload(): ExternalDatabase['prepareFileUpload'] {
    return this.database.prepareFileUpload
  }

  set prepareFileUpload(value: ExternalDatabase['prepareFileUpload']) {
    this.database.prepareFileUpload = value
    this.invokeListeners('prepareFileUpload')
  }

  get fetchWebsiteMeta(): ExternalDatabase['fetchWebsiteMeta'] {
    return this.database.fetchWebsiteMeta
  }

  set fetchWebsiteMeta(value: ExternalDatabase['fetchWebsiteMeta']) {
    this.database.fetchWebsiteMeta = value
    this.invokeListeners('fetchWebsiteMeta')
  }

  get fetchUnsplashImages(): ExternalDatabase['fetchUnsplashImages'] {
    return this.database.fetchUnsplashImages
  }

  set fetchUnsplashImages(value: ExternalDatabase['fetchUnsplashImages']) {
    this.database.fetchUnsplashImages = value
    this.invokeListeners('fetchUnsplashImages')
  }

  get pageQuery(): ExternalDatabase['pageQuery'] {
    return this.database.pageQuery
  }

  set pageQuery(value: ExternalDatabase['pageQuery']) {
    this.database.pageQuery = value
    this.invokeListeners('pageQuery')
  }
}

export const ExternalPropsContext = createContext<ExternalProps>(new ExternalProps())
