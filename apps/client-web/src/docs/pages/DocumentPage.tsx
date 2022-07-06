import React, { useEffect, useMemo, useState } from 'react'
import { Spin } from '@mashcard/design-system'
import { EditorContent, useEditor } from '@mashcard/editor'
import { DocumentTitle } from './components/DocumentTitle'
import { useSyncProvider, useBlockSyncProvider, useDocHistoryProvider } from './hooks'
import { TrashPrompt } from '../common/components/TrashPrompt'
import { useNavigate } from 'react-router-dom'
import { editorVar, awarenessInfosVar, isSavingVar } from '../reactiveVars'
import { useDocumentEditable } from './hooks/useDocumentEditable'
import * as Root from './DocumentPage.style'
import { useDocMeta } from '../store/DocMeta'
import { useEditorOptions } from './hooks/useEditorOptions'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

interface DocumentPageProps {
  // default: user can edit/view document normally
  // presentation: just for viewing and can not edit it.
  mode?: 'default' | 'presentation'
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ mode }) => {
  const docMeta = useDocMeta()
  const navigate = useNavigate()
  const [latestLoading, setLatestLoading] = useState(true)

  const queryVariables = useMemo(
    () => ({ rootId: docMeta.id as string, historyId: docMeta.historyId, domain: docMeta.domain }),
    [docMeta.id, docMeta.historyId, docMeta.domain]
  )

  const { rootBlock, data, committing: blocksCommitting } = useSyncProvider(queryVariables)

  const freeze = mode === 'presentation'
  const currentRootBlock = rootBlock.current
  const [documentEditable] = useDocumentEditable(freeze ?? !docMeta.historyId, currentRootBlock)

  const { provider, loading, committing, awarenessInfos, meta, setMeta } = useBlockSyncProvider({
    blockId: docMeta.id as string,
    historyId: docMeta.historyId,
    editable: documentEditable
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
    provider,
    documentEditable,
    blocks: data?.childrenBlocks
  })

  // new ydoc requires new editor to load it
  const editor = useEditor(editorOptions, [provider])

  // TODO: refactor editor reactive var
  useEffect(() => {
    editorVar(freeze ? null : editor)
  }, [editor, freeze])

  useEffect(() => {
  if (!loading) setLatestLoading(false)
} , [loading, setLatestLoading])

  if (latestLoading || !currentRootBlock) {
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
        width={{
          '@mdOnly': 'md',
          '@smDown': 'sm'
        }}
      >
        <DocumentTitle docBlock={currentRootBlock} editable={documentEditable} meta={meta} setMeta={setMeta} />
        <Root.PageContent>
          <EditorContent
            editor={editor}
            editable={documentEditable}
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
