import React, { useEffect, useMemo } from 'react'
import { Skeleton } from '@brickdoc/design-system'
import { EditorContent, useEditor, useEditorI18n } from '@brickdoc/editor'
import { Block } from '@/BrickdocGraphQL'
import { DocumentTitle } from './components/DocumentTitle'
import { useSyncProvider } from './hooks'
import { blocksToJSONContents } from '../common/blocks'
import { JSONContent } from '@tiptap/core'
import { TrashPrompt } from '../common/components/TrashPrompt'
import { Navigate } from 'react-router-dom'
import { DocMeta, NonNullDocMeta } from './DocumentContentPage'
import { editorVar } from '../reactiveVars'
import { useEditorExternalProps } from './hooks/useEditorExternalProps'
import { useDocumentEditable } from './hooks/useDocumentEditable'
import * as Root from './DocumentPage.style'

interface DocumentPageProps {
  docMeta: DocMeta
  // default: user can edit/view document normally
  // presentation: just for viewing and can not edit it.
  mode?: 'default' | 'presentation'
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ docMeta, mode }) => {
  // apollo doesn't work well with React Suspense. We must place this suspense-related hook above
  // apollo useQuery API to avoid issues like sending request twice.
  // useEditorI18n() is called inside useEditor(), which is below useGetChildrenBlocksQuery(). So we
  // promote this call to the beginning of this render fn.
  useEditorI18n()

  const queryVariables = useMemo(
    () => ({ rootId: docMeta.id as string, snapshotVersion: docMeta.snapshotVersion }),
    [docMeta.id, docMeta.snapshotVersion]
  )

  const { rootBlock, data, loading, onDocSave } = useSyncProvider(queryVariables)

  const freeze = mode === 'presentation'
  const currentRootBlock = rootBlock.current
  const [documentEditable] = useDocumentEditable(freeze ?? false, docMeta, currentRootBlock)

  const externalProps = useEditorExternalProps({
    docMeta,
    documentEditable,
    blocks: data?.childrenBlocks
  })

  const editor = useEditor({
    onSave: onDocSave,
    externalProps,
    editable: documentEditable
  })

  useEffect(() => {
    if (!freeze) editorVar(editor)
  }, [editor, freeze])

  useEffect(() => {
    if (editor && !editor.isDestroyed && data?.childrenBlocks) {
      const content: JSONContent[] = blocksToJSONContents(data?.childrenBlocks as Block[])

      if (content.length) {
        editor.chain().setMeta('preventUpdate', true).replaceRoot(content[0]).run()
      }
    }
  }, [editor, data, data?.childrenBlocks])

  // due to #914, to reduce conflicts, temporarily disable subscription for documents in presentation mode
  if (docMeta.snapshotVersion === 0 && !freeze) {
    // Fix #1155
    // useDocumentSubscription({
    //   docid: docMeta.id as string,
    //   editor,
    //   setDocumentEditable,
    //   refetchDocument: refetch
    // })
  }

  if (loading || docMeta.documentInfoLoading) {
    return <Skeleton type="article" />
  }

  const redirectPersonalSpacePath = `/${docMeta.personalDomain}`

  if (data === undefined) {
    return null
  }

  if (!docMeta.viewable || (docMeta.isAnonymous && !data?.childrenBlocks?.length)) {
    return <Navigate to={redirectPersonalSpacePath} />
    // return <Alert message="TODO Page not found" type="error" />
  }

  const PageElement = (
    <>
      {docMeta.id && docMeta.isDeleted && <TrashPrompt docMeta={docMeta as NonNullDocMeta} />}
      <Root.Page
        width={{
          '@mdOnly': 'md',
          '@smDown': 'sm'
        }}
      >
        <DocumentTitle blocks={data?.childrenBlocks} editable={documentEditable} />
        <Root.PageContent>
          <EditorContent editor={editor} externalProps={externalProps} />
        </Root.PageContent>
      </Root.Page>
    </>
  )

  if (!docMeta.id) {
    return PageElement
  }

  if (data?.childrenBlocks?.length) {
    return PageElement
  } else {
    return <Navigate to={redirectPersonalSpacePath} />
  }
}
