import { useLocation } from 'react-router-dom'
import { useMemo, useRef, useContext, useEffect } from 'react'
import { EditorDataSource } from '@brickdoc/editor'
import {
  GetChildrenBlocksQuery,
  QueryPreviewBoxQuery,
  QueryPreviewBoxQueryVariables,
  QueryPreviewBoxDocument,
  useGetSpaceMembersQuery
} from '@/BrickdocGraphQL'
import { usePrepareFileUpload } from './usePrepareFileUpload'
import { useFetchUnsplashImages } from './useFetchUnsplashImages'
import { useImperativeQuery } from '@/common/hooks'
import { PageTree } from '@/docs/common/components/PageTree'
import { DocMeta } from '../DocumentContentPage'
import { useReactiveVar } from '@apollo/client'
import { FormulaContextVar, pagesVar } from '@/docs/reactiveVars'
import { BrickdocContext } from '@/common/brickdocContext'

export interface UseEditorDataSourceProps {
  docMeta: DocMeta
  blocks: GetChildrenBlocksQuery['childrenBlocks']
  documentEditable: boolean
}

function useQuery(): URLSearchParams {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export function useEditorDataSource({ docMeta, documentEditable, blocks }: UseEditorDataSourceProps): EditorDataSource {
  const dataSource = useRef<EditorDataSource>(new EditorDataSource())
  const { data } = useGetSpaceMembersQuery()
  const pageQuery = useQuery()
  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const queryPreviewBox = useImperativeQuery<QueryPreviewBoxQuery, QueryPreviewBoxQueryVariables>(
    QueryPreviewBoxDocument
  )

  const formulaContext = useReactiveVar(FormulaContextVar)
  const { settings, features } = useContext(BrickdocContext)

  // space members
  useEffect(() => {
    dataSource.current.spaceMembers =
      data?.spaceMembers?.map(member => ({
        name: member.name,
        avatar: member.avatarData?.url ?? '',
        domain: member.domain
      })) ?? []
  }, [data?.spaceMembers])

  // pageQuery
  useEffect(() => {
    dataSource.current.pageQuery = pageQuery
  }, [pageQuery])

  // feature flags
  useEffect(() => {
    dataSource.current.featureFlags = features
  }, [features])

  // settings
  useEffect(() => {
    dataSource.current.settings = settings
  }, [settings])

  // renderPageTree
  useEffect(() => {
    dataSource.current.renderPageTree = () => <PageTree mode="subPage" docMeta={docMeta} />
  }, [docMeta])

  // formula context
  useEffect(() => {
    dataSource.current.formulaContext = formulaContext
  }, [formulaContext])

  // fetch unsplash images
  useEffect(() => {
    dataSource.current.fetchUnsplashImages = fetchUnsplashImages
  }, [fetchUnsplashImages])

  // fetch website meta
  useEffect(() => {
    dataSource.current.fetchWebsiteMeta = async (url: string) => {
      const { data, error } = await queryPreviewBox({ url })

      return {
        success: !error,
        data: data.previewBox
      }
    }
  }, [queryPreviewBox])

  // prepare file upload
  useEffect(() => {
    dataSource.current.prepareFileUpload = prepareFileUpload
  }, [prepareFileUpload])

  // blobs
  useEffect(() => {
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
  useEffect(() => {
    dataSource.current.documentPages = pagesData
  }, [pagesData])

  // collaborators
  useEffect(() => {
    dataSource.current.collaborators = docMeta.collaborators.map(user => ({
      name: user.name,
      domain: user.domain,
      avatar: user.avatarData?.url ?? undefined
    }))
  }, [docMeta.collaborators])

  // document editable
  useEffect(() => {
    dataSource.current.documentEditable = documentEditable
  }, [documentEditable])

  // domain
  useEffect(() => {
    dataSource.current.domain = docMeta.domain
  }, [docMeta.domain])

  // rootId
  useEffect(() => {
    dataSource.current.rootId = docMeta.id!
  }, [docMeta.id])

  return dataSource.current
}
