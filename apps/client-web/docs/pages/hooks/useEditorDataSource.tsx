import React from 'react'
import { EditorDataSource } from '@brickdoc/editor'
import {
  GetChildrenBlocksQuery,
  QueryPreviewBoxQuery,
  QueryPreviewBoxQueryVariables,
  QueryPreviewBoxDocument
} from '@/BrickdocGraphQL'
import { usePrepareFileUpload } from './usePrepareFileUpload'
import { useFetchUnsplashImages } from './useFetchUnsplashImages'
import { useImperativeQuery } from '@/common/hooks'
import { PageTree } from '@/docs/common/components/PageTree'
import { DocMeta } from '../DocumentContentPage'
import { useReactiveVar } from '@apollo/client'
import { FormulaContextVar, pagesVar } from '@/docs/reactiveVars'
import { BrickdocContext } from '@/common/brickdocContext'
import { useLocation } from 'react-router-dom'

export interface UseEditorDataSourceProps {
  docMeta: DocMeta
  blocks: GetChildrenBlocksQuery['childrenBlocks']
  documentEditable: boolean
}

function useQuery(): URLSearchParams {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export function useEditorDataSource({ docMeta, documentEditable, blocks }: UseEditorDataSourceProps): EditorDataSource {
  const dataSource = React.useRef<EditorDataSource>(new EditorDataSource())
  const pageQuery = useQuery()
  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const queryPreviewBox = useImperativeQuery<QueryPreviewBoxQuery, QueryPreviewBoxQueryVariables>(
    QueryPreviewBoxDocument
  )

  const formulaContext = useReactiveVar(FormulaContextVar)
  const { settings, features } = React.useContext(BrickdocContext)

  // pageQuery
  React.useEffect(() => {
    dataSource.current.pageQuery = pageQuery
  }, [pageQuery])

  // feature flags
  React.useEffect(() => {
    dataSource.current.featureFlags = features
  }, [features])

  // settings
  React.useEffect(() => {
    dataSource.current.settings = settings
  }, [settings])

  // renderPageTree
  React.useEffect(() => {
    dataSource.current.renderPageTree = () => <PageTree mode="subPage" docMeta={docMeta} />
  }, [docMeta])

  // formula context
  React.useEffect(() => {
    dataSource.current.formulaContext = formulaContext
  }, [formulaContext])

  // fetch unsplash images
  React.useEffect(() => {
    dataSource.current.fetchUnsplashImages = fetchUnsplashImages
  }, [fetchUnsplashImages])

  // fetch website meta
  React.useEffect(() => {
    dataSource.current.fetchWebsiteMeta = async (url: string) => {
      const { data, error } = await queryPreviewBox({ url })

      return {
        success: !error,
        data: data.previewBox
      }
    }
  }, [queryPreviewBox])

  // prepare file upload
  React.useEffect(() => {
    dataSource.current.prepareFileUpload = prepareFileUpload
  }, [prepareFileUpload])

  // blobs
  React.useEffect(() => {
    dataSource.current.blobs =
      blocks?.reduce<EditorDataSource['blobs']>((prev, cur) => {
        return {
          ...prev,
          [cur.rootId ?? cur.id]: [
            ...(prev[cur.rootId ?? cur.id] ?? []),
            ...(cur.blobs?.map(blob => ({
              key: blob.blobKey,
              url: blob.url
            })) ?? [])
          ]
        }
      }, {}) ?? {}
  }, [blocks])

  // document pages
  const pagesData = useReactiveVar(pagesVar)
  React.useEffect(() => {
    dataSource.current.documentPages = pagesData
  }, [pagesData])

  // collaborators
  React.useEffect(() => {
    dataSource.current.collaborators = docMeta.collaborators.map(user => ({
      name: user.name,
      domain: user.domain,
      avatar: user.avatarData?.url ?? undefined
    }))
  }, [docMeta.collaborators])

  // document editable
  React.useEffect(() => {
    dataSource.current.documentEditable = documentEditable
  }, [documentEditable])

  // domain
  React.useEffect(() => {
    dataSource.current.domain = docMeta.domain
  }, [docMeta.domain])

  // rootId
  React.useEffect(() => {
    dataSource.current.rootId = docMeta.id!
  }, [docMeta.id])

  return dataSource.current
}
