import { ReactElement } from 'react'
import { ContextInterface } from '@brickdoc/formula'
import { DashboardPluginOptions } from '@brickdoc/uploader'
import { Preview_Box, Block } from '@brickdoc/schema'
import { To, NavigateOptions } from 'react-router-dom'

export interface WebsiteMeta {
  url: string
  title?: string
  description?: string
  cover?: string | null
  icon?: string
}

export interface Member {
  name: string | null | undefined
  domain: string
  avatar: string | null | undefined
}

export interface Collaborator extends Member {}

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

// TODO: 重新梳理 editor props，避免与实现过度耦合（例如 featureFlags 这种 prop）
export interface EditorProps {
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

  spaceMembers: Member[]

  domain: string

  rootId: string

  historyId?: string

  pageQuery: URLSearchParams | null

  navigate: (to: To, options?: NavigateOptions) => void
}

// we don't want this context cause rerender, therefore it is not a React Context.
export const EditorPropsContext: EditorProps = {
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
    throw new Error('prepareFileUpload is not implemented.')
  },
  fetchWebsiteMeta() {
    throw new Error('fetchWebsiteMeta is not implemented.')
  },
  fetchUnsplashImages() {
    throw new Error('fetchUnsplashImages is not implemented.')
  },
  navigate() {
    throw new Error('navigate is not implemented.')
  }
}

export function useEditorPropsEffect(nextProps: EditorProps): void {
  EditorPropsContext.blobs = nextProps.blobs
  EditorPropsContext.blocks = nextProps.blocks
  EditorPropsContext.collaborators = nextProps.collaborators
  EditorPropsContext.documentEditable = nextProps.documentEditable
  EditorPropsContext.documentPages = nextProps.documentPages
  EditorPropsContext.domain = nextProps.domain
  EditorPropsContext.featureFlags = nextProps.featureFlags
  EditorPropsContext.fetchUnsplashImages = nextProps.fetchUnsplashImages
  EditorPropsContext.fetchWebsiteMeta = nextProps.fetchWebsiteMeta
  EditorPropsContext.formulaContext = nextProps.formulaContext
  EditorPropsContext.pageQuery = nextProps.pageQuery
  EditorPropsContext.prepareFileUpload = nextProps.prepareFileUpload
  EditorPropsContext.renderPageTree = nextProps.renderPageTree
  EditorPropsContext.rootId = nextProps.rootId
  EditorPropsContext.historyId = nextProps.historyId
  EditorPropsContext.settings = nextProps.settings
  EditorPropsContext.spaceMembers = nextProps.spaceMembers
  EditorPropsContext.navigate = nextProps.navigate
}
