import React, { useEffect } from 'react'
import { Node } from 'prosemirror-model'
import { Alert, Skeleton } from '@brickdoc/design-system'
import { EditorContent, useEditor } from '@brickdoc/editor'
import { useGetChildrenBlocksQuery, Block, Filesourcetype, GetChildrenBlocksQuery } from '@/BrickdocGraphQL'
import { DocumentTitle } from './DocumentTitle'
import { blocksToJSONContents } from './useSyncProvider'
import { useDocumentSubscription } from './useDocumentSubscription'
import { usePrepareFileUpload } from './usePrepareFileUpload'
import { useFetchUnsplashImages } from './useFetchUnsplashImages'
import { useDatabaseRows } from './useDatabaseRows'
import styles from './DocumentPage.module.less'
import { JSONContent } from '@tiptap/core'
import { TrashPrompt } from '../common/components/TrashPrompt'
import { useFetchWebsiteMeta } from './useFetchWebsiteMeta'
interface DocumentPageProps {
  docid: string | undefined
  webid: string
  snapshotVersion: number
  defaultEditable?: boolean
  onCommit: (doc: Node) => Promise<void>
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ webid, docid, snapshotVersion, defaultEditable = true, onCommit }) => {
  const childrenBlocks = React.useRef<GetChildrenBlocksQuery['childrenBlocks']>()
  const { data, loading } = useGetChildrenBlocksQuery({
    variables: { rootId: docid as string, snapshotVersion }
  })

  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const fetchWebsiteMeta = useFetchWebsiteMeta()
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
    useDatabaseRows,
    prepareFileUpload,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    getImageUrl,
    getPdfUrl,
    editable: defaultEditable
  })

  const [editable, setEditable] = React.useState(defaultEditable)

  const restorePrompt = React.useRef(<></>)
  // NOTE Set `editable` flag to `false` and add `restore` prompt if root block is deleted.
  if (docid && editable && data?.childrenBlocks?.length) {
    const root = data.childrenBlocks.find(block => block.id === docid)
    if (root?.deletedAt) {
      restorePrompt.current = <TrashPrompt webid={webid} docid={docid} />
      if (editor) {
        editor.options.editable = false
        editor.view.update(editor.view.props)
      }
      setEditable(false)
    }
  }

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

      console.log({ data, content, docid, snapshotVersion })

      if (content.length) {
        editor.commands.replaceRoot(content[0])
      }
    }
  }, [editor, data, docid, snapshotVersion])

  useDocumentSubscription({ docid: docid as string, editor })

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
      editable={editable}
    />
  )

  const PageElement = (
    <>
      {restorePrompt.current}
      <div className={styles.page}>
        {DocumentTitleElement}
        <EditorContent editor={editor} />
      </div>
    </>
  )

  if (!docid) {
    return PageElement
  }

  if (data?.childrenBlocks?.length) {
    return PageElement
  } else {
    return <Alert message="Page not found" type="error" />
  }
}
