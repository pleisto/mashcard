import { DocumentBlockQuery } from '@/MashcardGraphQL'
import { Spin } from '@mashcard/design-system'
import { EditorContent, useEditor } from '@mashcard/legacy-editor'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocMeta } from '../../../_shared/DocMeta'
import { awarenessInfosVar, isSavingVar } from '../../../_shared/reactiveVars'
import { DocumentTitle } from './DocumentTitle'
import { TrashPrompt } from './TrashPrompt'
import { useDocHistoryProvider } from './useDocHistoryProvider'
import { useDocSyncProvider } from './useDocSyncProvider'
import { useEditorOptions } from './useEditorOptions'
import { useLegacySyncProvider } from './useLegacySyncProvider'
import * as Root from './DocumentEditor.style'

interface DocumentEditorProps {
  data?: DocumentBlockQuery
  loading: boolean
  editable: boolean
}

export const DocumentEditor: FC<DocumentEditorProps> = ({ editable, loading, data }) => {
  const docMeta = useDocMeta()
  const navigate = useNavigate()

  const queryVariables = useMemo(
    () => ({ rootId: docMeta.id as string, historyId: docMeta.historyId, domain: docMeta.domain }),
    [docMeta.id, docMeta.historyId, docMeta.domain]
  )

  const { committing: blocksCommitting } = useLegacySyncProvider(queryVariables)

  const documentBlobs = data?.blockNew?.blobs ?? []

  const { provider, committing, awarenessInfos, meta, setMeta } = useDocSyncProvider({
    blockId: docMeta.id as string,
    historyId: docMeta.historyId,
    editable,
    data
  })

  useDocHistoryProvider(docMeta.id as string)

  useEffect(() => {
    isSavingVar(blocksCommitting || committing)
  }, [blocksCommitting, committing])
  useEffect(() => {
    awarenessInfosVar(awarenessInfos)
  }, [awarenessInfos])

  const editorOptions = useEditorOptions({
    docMeta,
    docBlobs: documentBlobs,
    provider,
    editable
  })

  const editor = useEditor(editorOptions, [provider])

  const pageRef = useRef<HTMLDivElement>(null)
  const pageContentRef = useRef<HTMLDivElement>(null)

  // setup this mouse down handler to start node selection when click outside the document area
  const handleMultipleNodeSelectionMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(
    event => {
      // only allows multiple node selection work on Page and PageContent
      if (event.target !== pageRef.current && event.target !== pageContentRef.current) return
      editor?.commands.startMultipleNodeSelection(event.nativeEvent)
    },
    [editor?.commands]
  )

  if (loading || !docMeta.id) {
    return (
      <Root.PageSpinWrapper>
        <Spin size="lg" data-testid={TEST_ID_ENUM.page.DocumentPage.loading.id} />
      </Root.PageSpinWrapper>
    )
  }

  const PageElement = (
    <>
      {docMeta.id && docMeta.documentInfo?.isDeleted && <TrashPrompt />}
      <Root.Page
        ref={pageRef}
        width={{
          '@mdOnly': 'md',
          '@smDown': 'sm'
        }}
        onMouseDown={handleMultipleNodeSelectionMouseDown}
      >
        <DocumentTitle docId={docMeta.id} docBlobs={documentBlobs} editable={editable} meta={meta} setMeta={setMeta} />
        <Root.PageContent ref={pageContentRef}>
          <EditorContent
            editor={editor}
            editable={editable}
            rootId={docMeta.id}
            domain={docMeta.domain}
            historyId={docMeta.historyId}
            navigate={navigate}
          />
        </Root.PageContent>
      </Root.Page>
    </>
  )

  return PageElement
}
