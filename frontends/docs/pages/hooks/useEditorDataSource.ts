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
import { DocMeta } from '../DocumentContentPage'
import { useReactiveVar } from '@apollo/client'
import { FormulaContextVar, pagesVar } from '@/docs/reactiveVars'
import { UpdateBlocks } from './useSyncProvider'
import { useDatabaseRows } from './useDatabaseRows'

export interface UseEditorDataSourceProps {
  docMeta: DocMeta
  blocks: GetChildrenBlocksQuery['childrenBlocks']
  updateBlocks: UpdateBlocks
  documentEditable: boolean
}

export function useEditorDataSource({
  docMeta,
  documentEditable,
  blocks,
  updateBlocks
}: UseEditorDataSourceProps): EditorDataSource {
  const dataSource = React.useRef<EditorDataSource>(new EditorDataSource())
  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const queryPreviewBox = useImperativeQuery<QueryPreviewBoxQuery, QueryPreviewBoxQueryVariables>(
    QueryPreviewBoxDocument
  )
  const { rows, fetchRows, addRow, updateRows, removeRow, moveRow } = useDatabaseRows({ updateBlocks })
  const formulaContext = useReactiveVar(FormulaContextVar)

  // formula context
  React.useEffect(() => {
    dataSource.current.formulaContext = formulaContext
  }, [formulaContext])

  // table
  React.useEffect(() => {
    dataSource.current.table = {
      rows,
      fetchRows,
      addRow,
      moveRow,
      removeRow,
      updateRows
    }
  }, [addRow, rows, fetchRows, moveRow, removeRow, updateRows])

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
          [cur.id]:
            cur.blobs?.map(blob => ({
              key: blob.blobKey,
              url: blob.url
            })) ?? []
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
      webid: user.webid,
      avatar: user.avatarData?.url ?? undefined
    }))
  }, [docMeta.collaborators])

  // document editable
  React.useEffect(() => {
    dataSource.current.documentEditable = documentEditable
  }, [documentEditable])

  // webid
  React.useEffect(() => {
    dataSource.current.webid = docMeta.webid
  }, [docMeta.webid])

  // rootId
  React.useEffect(() => {
    dataSource.current.rootId = docMeta.id!
  }, [docMeta.id])

  return dataSource.current
}