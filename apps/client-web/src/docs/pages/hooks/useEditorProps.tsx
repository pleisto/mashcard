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
import { useReactiveVar } from '@apollo/client'
import { FormulaContextVar, pagesVar } from '@/docs/reactiveVars'
import { BrickdocContext } from '@/common/brickdocContext'
import { Block } from '@brickdoc/schema'
import { useDocMeta } from '@/docs/store/DocMeta'

export interface UseEditorProps {
  blocks: Block[]
  documentEditable: boolean
}

function useQuery(): URLSearchParams {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export function useEditorProps({ documentEditable, blocks }: UseEditorProps): EditorProps {
  const { id, collaborators: metaCollaborators, domain } = useDocMeta()
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

  const renderPageTree = useCallback(() => <PageTree mode="subPage" />, [])

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
      metaCollaborators.map(user => ({
        name: user.name,
        domain: user.domain,
        avatar: user.avatarData?.url ?? undefined
      })),
    [metaCollaborators]
  )

  return {
    blobs,
    blocks,
    collaborators,
    documentEditable,
    documentPages,
    domain,
    featureFlags: features,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    formulaContext,
    pageQuery,
    prepareFileUpload,
    renderPageTree,
    rootId: id ?? '',
    settings,
    spaceMembers
  }
}
