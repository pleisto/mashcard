import { useLocation } from 'react-router-dom'
import { useMemo, useRef, useContext, useEffect } from 'react'
import { ExternalProps } from '@brickdoc/editor'
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

export interface UseEditorExternalProps {
  docMeta: DocMeta
  blocks: GetChildrenBlocksQuery['childrenBlocks']
  documentEditable: boolean
}

function useQuery(): URLSearchParams {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export function useEditorExternalProps({ docMeta, documentEditable, blocks }: UseEditorExternalProps): ExternalProps {
  const externalProps = useRef<ExternalProps>(new ExternalProps())
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
    externalProps.current.spaceMembers =
      data?.spaceMembers?.map(member => ({
        name: member.name,
        avatar: member.avatarData?.url ?? '',
        domain: member.domain
      })) ?? []
  }, [data?.spaceMembers])

  // pageQuery
  useEffect(() => {
    externalProps.current.pageQuery = pageQuery
  }, [pageQuery])

  // feature flags
  useEffect(() => {
    externalProps.current.featureFlags = features
  }, [features])

  // settings
  useEffect(() => {
    externalProps.current.settings = settings
  }, [settings])

  // renderPageTree
  useEffect(() => {
    externalProps.current.renderPageTree = () => <PageTree mode="subPage" docMeta={docMeta} />
  }, [docMeta])

  // formula context
  useEffect(() => {
    externalProps.current.formulaContext = formulaContext
  }, [formulaContext])

  // fetch unsplash images
  useEffect(() => {
    externalProps.current.fetchUnsplashImages = fetchUnsplashImages
  }, [fetchUnsplashImages])

  // fetch website meta
  useEffect(() => {
    externalProps.current.fetchWebsiteMeta = async (url: string) => {
      const { data, error } = await queryPreviewBox({ url })

      return {
        success: !error,
        data: data.previewBox
      }
    }
  }, [queryPreviewBox])

  // prepare file upload
  useEffect(() => {
    externalProps.current.prepareFileUpload = prepareFileUpload
  }, [prepareFileUpload])

  // blobs
  useEffect(() => {
    externalProps.current.blobs =
      blocks?.reduce<ExternalProps['blobs']>((prev, cur) => {
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
    externalProps.current.documentPages = pagesData
  }, [pagesData])

  // collaborators
  useEffect(() => {
    externalProps.current.collaborators = docMeta.collaborators.map(user => ({
      name: user.name,
      domain: user.domain,
      avatar: user.avatarData?.url ?? undefined
    }))
  }, [docMeta.collaborators])

  // document editable
  useEffect(() => {
    externalProps.current.documentEditable = documentEditable
  }, [documentEditable])

  // domain
  useEffect(() => {
    externalProps.current.domain = docMeta.domain
  }, [docMeta.domain])

  // rootId
  useEffect(() => {
    externalProps.current.rootId = docMeta.id!
  }, [docMeta.id])

  return externalProps.current
}
