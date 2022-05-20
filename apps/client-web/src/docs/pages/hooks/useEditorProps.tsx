import { useLocation } from 'react-router-dom'
import { useMemo, useContext, useCallback } from 'react'
import { EditorProps } from '@brickdoc/editor'
import {
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
import { Block } from '@brickdoc/schema'

export interface UseEditorProps {
  docMeta: DocMeta
  blocks: Block[]
  documentEditable: boolean
}

function useQuery(): URLSearchParams {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export function useEditorProps({ docMeta, documentEditable, blocks }: UseEditorProps): EditorProps {
  const { data } = useGetSpaceMembersQuery()
  const pageQuery = useQuery()
  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const queryPreviewBox = useImperativeQuery<QueryPreviewBoxQuery, QueryPreviewBoxQueryVariables>(
    QueryPreviewBoxDocument
  )

  const formulaContext = useReactiveVar(FormulaContextVar)
  const { settings, features } = useContext(BrickdocContext)

  const spaceMembers = useMemo(
    () =>
      data?.spaceMembers?.map(member => ({
        name: member.name,
        avatar: member.avatarData?.url ?? '',
        domain: member.domain
      })) ?? [],
    [data?.spaceMembers]
  )

  const renderPageTree = useCallback(() => <PageTree mode="subPage" docMeta={docMeta} />, [docMeta])

  // fetch website meta
  const fetchWebsiteMeta = useCallback(
    async (url: string) => {
      const { data, error } = await queryPreviewBox({ url })

      return {
        success: !error,
        data: data.previewBox
      }
    },
    [queryPreviewBox]
  )

  // blobs
  const blobs = useMemo<EditorProps['blobs']>(
    () =>
      blocks?.reduce<EditorProps['blobs']>((prev, cur) => {
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
      }, {}) ?? {},
    [blocks]
  )

  const documentPages = useReactiveVar(pagesVar)

  // collaborators
  const collaborators = useMemo(
    () =>
      docMeta.collaborators.map(user => ({
        name: user.name,
        domain: user.domain,
        avatar: user.avatarData?.url ?? undefined
      })),
    [docMeta.collaborators]
  )

  return {
    blobs,
    blocks,
    collaborators,
    documentEditable,
    documentPages,
    domain: docMeta.domain,
    featureFlags: features,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    formulaContext,
    pageQuery,
    prepareFileUpload,
    renderPageTree,
    rootId: docMeta.id ?? '',
    settings,
    spaceMembers
  }
}
