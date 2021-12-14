import React, { useEffect, useRef, useMemo } from 'react'
import { Skeleton } from '@brickdoc/design-system'
import { Alert } from '@brickdoc/brickdoc-headless-design-system'
import { EditorContent, useEditor, useEditorI18n } from '@brickdoc/editor'
import { Block } from '@/BrickdocGraphQL'
import { DocumentTitle } from './components/DocumentTitle'
import { useDocumentSubscription, useSyncProvider } from './hooks'
import { blocksToJSONContents } from '../common/blocks'
import styles from './DocumentPage.module.less'
import { JSONContent } from '@tiptap/core'
import { TrashPrompt } from '../common/components/TrashPrompt'
import { Navigate } from 'react-router-dom'
import { DocMeta, NonNullDocMeta } from './DocumentContentPage'
import { editorVar } from '../reactiveVars'
import { useEditorDataSource } from './hooks/useEditorDataSource'
import { useDocumentEditable } from './hooks/useDocumentEditable'
interface DocumentPageProps {
  docMeta: DocMeta
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ docMeta }) => {
  // apollo doesn't work well with React Suspense. We must place this suspense-related hook above
  // apollo useQuery API to avoid issues like sending request twice.
  // useEditorI18n() is called inside useEditor(), which is below useGetChildrenBlocksQuery(). So we
  // promote this call to the beginning of this render fn.
  useEditorI18n()

  const queryVariables = useMemo(
    () => ({ rootId: docMeta.id as string, snapshotVersion: docMeta.snapshotVersion }),
    [docMeta.id, docMeta.snapshotVersion]
  )

  const lastQueryVariables = useRef<typeof queryVariables>()

  const { rootBlock, data, loading, refetch, onDocSave, updateBlocks, updateCachedDocBlock } =
    useSyncProvider(queryVariables)

  const currentRootBlock = rootBlock.current
  const [documentEditable, setDocumentEditable] = useDocumentEditable(docMeta, currentRootBlock)

  const editorDataSource = useEditorDataSource({
    docMeta,
    documentEditable,
    blocks: data?.childrenBlocks,
    updateBlocks
  })

  const editor = useEditor({
    onSave: onDocSave,
    externalDataSource: editorDataSource,
    editable: documentEditable
  })
  React.useEffect(() => {
    editorVar(editor)
  }, [editor])

  useEffect(() => {
    if (editor && !editor.isDestroyed && data?.childrenBlocks && queryVariables !== lastQueryVariables.current) {
      lastQueryVariables.current = queryVariables

      const content: JSONContent[] = blocksToJSONContents(data?.childrenBlocks as Block[])

      if (content.length) {
        editor.chain().setMeta('preventUpdate', true).replaceRoot(content[0]).run()
      }
    }
  }, [editor, data, data?.childrenBlocks, queryVariables])

  if (docMeta.snapshotVersion === 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDocumentSubscription({
      docid: docMeta.id as string,
      editor,
      setDocumentEditable,
      updateCachedDocBlock,
      refetchDocument: refetch
    })
  }

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

  const PageElement = (
    <>
      {docMeta.id && docMeta.isDeleted && <TrashPrompt docMeta={docMeta as NonNullDocMeta} />}
      <div className={styles.page}>
        <DocumentTitle blocks={data?.childrenBlocks} editable={documentEditable} />
        <div className={styles.pageWrap}>
          <EditorContent editor={editor} editorDataSource={editorDataSource} />
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
