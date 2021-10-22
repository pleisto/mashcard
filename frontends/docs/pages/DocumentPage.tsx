import React, { useEffect, useState, useRef } from 'react'
import { Node } from 'prosemirror-model'
import { Alert, Skeleton } from '@brickdoc/design-system'
import { EditorContent, useEditor, useEditorI18n } from '@brickdoc/editor'
import { useGetChildrenBlocksQuery, Block, Filesourcetype, GetChildrenBlocksQuery } from '@/BrickdocGraphQL'
import { DocumentTitle } from './components/DocumentTitle'
import {
  blocksToJSONContents,
  useDocumentSubscription,
  usePrepareFileUpload,
  useFetchUnsplashImages,
  useFetchWebsiteMeta,
  useSyncProvider
} from './hooks'
import { useDatabaseRows } from './hooks/useDatabaseRows'
import styles from './DocumentPage.module.less'
import { JSONContent } from '@tiptap/core'
import { TrashPrompt } from '../common/components/TrashPrompt'
import { Redirect } from 'react-router-dom'
import { DocMeta, NonNullDocMeta } from './DocumentContentPage'
import { editorVar } from '../reactiveVars'
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
  const childrenBlocks = useRef<GetChildrenBlocksQuery['childrenBlocks']>()
  const [focused, setFocused] = useState(false)

  // TODO lazy query here
  // TODO disable page tree select when loading
  // const [foo] = useLazyQuery(fooQuery, { onCompleted: () => /* ... */ })
  // useEffect(() => {
  //   foo()
  // }, [])

  const { data, loading, refetch } = useGetChildrenBlocksQuery({
    fetchPolicy: docMeta.snapshotVersion > 0 ? 'no-cache' : 'cache-and-network',
    nextFetchPolicy: 'cache-only',
    variables: { rootId: docMeta.id as string, snapshotVersion: docMeta.snapshotVersion }
  })

  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const fetchWebsiteMeta = useFetchWebsiteMeta()
  const createFileUrlGetter =
    (field: string) =>
    (node: Node): string | undefined => {
      if (node.attrs[field]?.source === Filesourcetype.External) {
        return node.attrs[field].key
      }

      if (node.attrs[field]?.source === Filesourcetype.Origin) {
        const block = childrenBlocks.current?.find(block => block.id === node.attrs.uuid)
        const blob = block?.blobs?.find(blob => blob.blobKey === node.attrs[field].key)
        return blob?.url
      }
    }
  const getImageUrl = createFileUrlGetter('image')
  const getAttachmentUrl = createFileUrlGetter('attachment')
  const getDocIconUrl = (): string | undefined => {
    if (!editor || editor.isDestroyed) return undefined
    return createFileUrlGetter('icon')(editor.state.doc)
  }
  const getDocCoverUrl = (): string | undefined => {
    if (!editor || editor.isDestroyed) return undefined
    return createFileUrlGetter('cover')(editor.state.doc)
  }

  // if there is no doc id, document will not have deleted status
  const [documentEditable, setDocumentEditable] = React.useState(!docMeta.id)
  const [deleted, setDeleted] = React.useState(false)

  const editor = useEditor({
    onSave: onCommit,
    useDatabaseRows: useDatabaseRows(),
    prepareFileUpload,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    getImageUrl,
    getAttachmentUrl,
    editable: documentEditable,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  })
  React.useEffect(() => {
    editorVar(editor)
  }, [editor])

  React.useEffect(() => {
    const block = data?.childrenBlocks?.find(block => block.id === docMeta.id)

    if (block) {
      const deleted = !!block.deletedAt
      setDeleted(deleted)

      if (editor) {
        const nextEditable = docMeta.editable && !deleted
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
    if (editor && !editor.isDestroyed && data?.childrenBlocks && !focused) {
      const content: JSONContent[] = blocksToJSONContents(data.childrenBlocks as Block[])
      childrenBlocks.current = data.childrenBlocks

      if (content.length) {
        editor.commands.replaceRoot(content[0])
      }
    }
  }, [editor, data, focused])

  useDocumentSubscription({ docid: docMeta.id as string, editor, setDocumentEditable, refetchDocument: refetch })

  if (loading || docMeta.documentInfoLoading) {
    return <Skeleton active />
  }

  if (!docMeta.viewable || (docMeta.isAnonymous && !data?.childrenBlocks?.length)) {
    if (docMeta.isRedirect) {
      return <Alert message="TODO Page not found" type="error" />
    } else {
      return <Redirect to="/" />
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
      {docMeta.id && deleted && <TrashPrompt docMeta={docMeta as NonNullDocMeta} />}
      <div className={styles.page}>
        {DocumentTitleElement}
        <div className={styles.pageWrap}>
          <EditorContent editor={editor} />
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
