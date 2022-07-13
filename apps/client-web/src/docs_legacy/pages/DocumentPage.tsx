import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useRef } from 'react'
import { Spin } from '@mashcard/design-system'
import { Block } from '@mashcard/schema'
import { EditorContent, useEditor } from '@mashcard/editor'
import { DocumentTitle } from './components/DocumentTitle'
import { useSyncProvider, useDocSyncProvider, useDocHistoryProvider } from './hooks'
import { TrashPrompt } from '../common/components/TrashPrompt'
import { useNavigate } from 'react-router-dom'
import { awarenessInfosVar, isSavingVar } from '../reactiveVars'
import * as Root from './DocumentPage.style'
import { useDocMeta } from '../store/DocMeta'
import { useEditorOptions } from './hooks/useEditorOptions'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { BlockNewQuery } from '@/MashcardGraphQL'

interface DocumentPageProps {
  data?: BlockNewQuery
  loading: boolean
  editable: boolean
}

export const DocumentPage: FC<DocumentPageProps> = ({ editable, loading, data }) => {
  const docMeta = useDocMeta()
  const navigate = useNavigate()

  const queryVariables = useMemo(
    () => ({ rootId: docMeta.id as string, historyId: docMeta.historyId, domain: docMeta.domain }),
    [docMeta.id, docMeta.historyId, docMeta.domain]
  )

  const { rootBlock, committing: blocksCommitting } = useSyncProvider(queryVariables)

  const currentRootBlock = rootBlock.current

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
    provider,
    documentEditable: editable,
    documentBlock: rootBlock.current as Block
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

  if (loading || !currentRootBlock) {
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
        <DocumentTitle docBlock={currentRootBlock} editable={editable} meta={meta} setMeta={setMeta} />
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
