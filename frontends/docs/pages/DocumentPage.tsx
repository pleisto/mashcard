import React, { useEffect, useRef, useMemo } from 'react'
import { Alert, Skeleton } from '@brickdoc/design-system'
import { EditorContent, useEditor, useEditorI18n } from '@brickdoc/editor'
import { useGetChildrenBlocksQuery, Block } from '@/BrickdocGraphQL'
import { DocumentTitle } from './components/DocumentTitle'
import {
  blocksToJSONContents,
  useDocumentSubscription,
  usePrepareFileUpload,
  useFetchUnsplashImages,
  useFetchWebsiteMeta,
  useSyncProvider,
  useFormulaContextGetter
} from './hooks'
import { useBlobGetter } from './hooks/useBlobGetter'
import { useDatabaseRows } from './hooks/useDatabaseRows'
import styles from './DocumentPage.module.less'
import { JSONContent } from '@tiptap/core'
import { TrashPrompt } from '../common/components/TrashPrompt'
import { Navigate } from 'react-router-dom'
import { DocMeta, NonNullDocMeta } from './DocumentContentPage'
import { editorVar } from '../reactiveVars'
import { useDocumentPagesGetter } from './hooks/useDocumentPagesGetter'
import { useDocumentCollaboratorsGetter } from './hooks/useDocumentCollaboratorsGetter'
interface DocumentPageProps {
  docMeta: DocMeta
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ docMeta }) => {
  // apollo doesn't work well with React Suspense. We must place this suspense-related hook above
  // apollo useQuery API to avoid issues like sending request twice.
  // useEditorI18n() is called inside useEditor(), which is below useGetChildrenBlocksQuery(). So we
  // promote this call to the beginning of this render fn.
  useEditorI18n()

  const [onCommit] = useSyncProvider()

  // TODO lazy query here
  // TODO disable page tree select when loading
  // const [foo] = useLazyQuery(fooQuery, { onCompleted: () => /* ... */ })
  // useEffect(() => {
  //   foo()
  // }, [])

  const queryVariables = useMemo(
    () => ({ rootId: docMeta.id as string, snapshotVersion: docMeta.snapshotVersion }),
    [docMeta.id, docMeta.snapshotVersion]
  )

  const lastQueryVariables = useRef<typeof queryVariables>()

  const { data, loading, refetch } = useGetChildrenBlocksQuery({
    fetchPolicy: docMeta.snapshotVersion > 0 ? 'no-cache' : 'cache-and-network',
    nextFetchPolicy: 'cache-only',
    variables: queryVariables
  })

  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const fetchWebsiteMeta = useFetchWebsiteMeta()

  const formulaContextActions = useFormulaContextGetter(docMeta)

  const getImageUrl = useBlobGetter('image', data?.childrenBlocks)
  const getAttachmentUrl = useBlobGetter('attachment', data?.childrenBlocks)
  const docIconGetter = useBlobGetter('icon', data?.childrenBlocks)
  const docCoverGetter = useBlobGetter('cover', data?.childrenBlocks)
  const getDocIconUrl = (): string | undefined => {
    if (!editor || editor.isDestroyed) return undefined
    return docIconGetter(editor.state.doc)
  }
  const getDocCoverUrl = (): string | undefined => {
    if (!editor || editor.isDestroyed) return undefined
    return docCoverGetter(editor.state.doc)
  }
  const [getDocCollaborators] = useDocumentCollaboratorsGetter(docMeta)
  const [getDocPages] = useDocumentPagesGetter(docMeta)

  // if there is no doc id, document will not have deleted status
  const [documentEditable, setDocumentEditable] = React.useState(!docMeta.id)

  const editor = useEditor({
    onSave: onCommit,
    useDatabaseRows: useDatabaseRows(),
    prepareFileUpload,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    getImageUrl,
    getAttachmentUrl,
    getCollaborators: getDocCollaborators,
    getPages: getDocPages,
    formulaContextActions,
    editable: documentEditable
  })
  React.useEffect(() => {
    editorVar(editor)
  }, [editor])

  React.useEffect(() => {
    const block = data?.childrenBlocks?.find(block => block.id === docMeta.id)

    if (block) {
      if (editor) {
        const nextEditable = docMeta.editable
        if (editor.options.editable !== nextEditable) {
          editor.options.editable = nextEditable
          editor.view.update(editor.view.props)
          setDocumentEditable(nextEditable)
        }
      }
    }
  }, [data?.childrenBlocks, docMeta.id, editor, docMeta.editable])

  const createDocAttrsUpdater =
    (field: string) =>
    (value: any): void => {
      if (!editor || editor.isDestroyed) return
      editor.commands.setDocAttrs({
        ...editor.state.doc.attrs,
        [field]: value
      })
    }

  const setTitle = createDocAttrsUpdater('title')
  const setIcon = createDocAttrsUpdater('icon')
  const setCover = createDocAttrsUpdater('cover')

  useEffect(() => {
    if (editor && !editor.isDestroyed && data?.childrenBlocks && queryVariables !== lastQueryVariables.current) {
      lastQueryVariables.current = queryVariables

      const content: JSONContent[] = blocksToJSONContents(data.childrenBlocks as Block[])

      if (content.length) {
        editor.commands.replaceRoot(content[0])
      }
    }
  }, [editor, data, queryVariables])

  useDocumentSubscription({ docid: docMeta.id as string, editor, setDocumentEditable, refetchDocument: refetch })

  if (loading || docMeta.documentInfoLoading) {
    return <Skeleton active />
  }

  if (!docMeta.viewable || (docMeta.isAnonymous && !data?.childrenBlocks?.length)) {
    if (docMeta.isRedirect) {
      return <Alert message="TODO Page not found" type="error" />
    } else {
      return <Navigate to="/" />
    }
  }

  const DocumentTitleElement = (
    <DocumentTitle
      blockId={editor?.state.doc.attrs.uuid}
      icon={editor?.state.doc.attrs.icon}
      cover={editor?.state.doc.attrs.cover}
      title={editor?.state.doc.attrs.title}
      onCoverChange={setCover}
      onIconChange={setIcon}
      onTitleChange={setTitle}
      getDocIconUrl={getDocIconUrl}
      getDocCoverUrl={getDocCoverUrl}
      prepareFileUpload={prepareFileUpload}
      fetchUnsplashImages={fetchUnsplashImages}
      editable={documentEditable}
    />
  )

  const PageElement = (
    <>
      {docMeta.id && docMeta.isDeleted && <TrashPrompt docMeta={docMeta as NonNullDocMeta} />}
      <div className={styles.page}>
        {DocumentTitleElement}
        <div className={styles.pageWrap}>
          <EditorContent editor={editor} formulaContextActions={formulaContextActions} />
        </div>
      </div>
    </>
  )

  if (!docMeta.id) {
    return PageElement
  }

  if (data?.childrenBlocks?.length) {
    return PageElement
  } else {
    return <Alert message="TODO Page not found" type="error" />
  }
}
