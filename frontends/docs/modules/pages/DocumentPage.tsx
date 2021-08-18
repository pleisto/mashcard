import React, { useEffect } from 'react'
import { Node } from 'prosemirror-model'
import { useParams } from 'react-router-dom'
import { Alert, Skeleton } from '@brickdoc/design-system'
import { EditorContent, useEditor } from '@brickdoc/editor'
import { useBlockSyncBatchMutation, useGetChildrenBlocksQuery, Block, Filesourcetype, GetChildrenBlocksQuery } from '@/BrickdocGraphQL'
import { DocumentTitle } from './DocumentTitle'
import { syncProvider, blocksToJSONContents } from './SyncProvider'
import { useDocumentSubscription } from './useDocumentSubscription'
import { usePrepareFileUpload } from './usePrepareFileUpload'
import { useFetchUnsplashImages } from './useFetchUnsplashImages'
import styles from './DocumentPage.module.less'
import { JSONContent } from '@tiptap/core'

export const DocumentPage: React.FC = () => {
  const { docid, snapshotVersion } = useParams<{ docid: string; snapshotVersion: string }>()
  const [blockSyncBatch] = useBlockSyncBatchMutation()
  const { onCommit } = syncProvider({ blockSyncBatch })

  const childrenBlocks = React.useRef<GetChildrenBlocksQuery['childrenBlocks']>()
  const { data, loading } = useGetChildrenBlocksQuery({
    variables: { rootId: docid, excludePages: false, snapshotVersion: Number(snapshotVersion || '0') }
  })

  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const createImageUrlGetter =
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
  const getImageUrl = createImageUrlGetter('image')
  const getPdfUrl = createImageUrlGetter('attachment')
  const getDocIconUrl = (): string | undefined => {
    if (!editor || editor.isDestroyed) {
      return undefined
    }
    return createImageUrlGetter('icon')(editor.state.doc)
  }
  const getDocCoverUrl = (): string | undefined => {
    if (!editor || editor.isDestroyed) {
      return undefined
    }
    return createImageUrlGetter('cover')(editor.state.doc)
  }

  const editor = useEditor({
    onSave: onCommit,
    prepareFileUpload,
    fetchUnsplashImages,
    getImageUrl,
    getPdfUrl
  })

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
  // const setSort = createDocAttrsUpdater('sort')

  useEffect(() => {
    if (editor && !editor.isDestroyed && data?.childrenBlocks) {
      const content: JSONContent[] = blocksToJSONContents(data.childrenBlocks as Block[])
      childrenBlocks.current = data.childrenBlocks

      console.log({ data, content })

      if (content.length) {
        editor.commands.replaceRoot(content[0])
      }
    }
  }, [editor, data])

  useDocumentSubscription({ docid, editor })

  if (loading) {
    return <Skeleton />
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
    />
  )

  if (!docid) {
    return (
      <div className={styles.page}>
        {DocumentTitleElement}
        <EditorContent editor={editor} />
      </div>
    )
  }

  if (data?.childrenBlocks?.length) {
    return (
      <div className={styles.page}>
        {DocumentTitleElement}
        <EditorContent editor={editor} />
      </div>
    )
  } else {
    return <Alert message="Page not found" type="error" />
  }
}
