import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Skeleton, Input } from '@brickdoc/design-system'
import { EditorContent, useEditor } from '@brickdoc/editor'
import { useBlockSyncBatchMutation, useGetChildrenBlocksQuery, Block } from '@/BrickdocGraphQL'
import { syncProvider, blocksToJSONContents } from './SyncProvider'
import { useDocumentSubscription } from './useDocumentSubscription'
import styles from './DocumentPage.module.less'

export const DocumentPage: React.FC = () => {
  const { webid, docid, ...restParams } = useParams<{ webid: string; docid: string; snapshotVersion: string }>()
  const [blockSyncBatch] = useBlockSyncBatchMutation()
  const { onCommit } = syncProvider({ blockSyncBatch })

  const { data, loading } = useGetChildrenBlocksQuery({
    variables: { parentId: docid, excludePages: false, snapshotVersion: Number(restParams.snapshotVersion || '0') }
  })

  const editor = useEditor({
    onCommit
  })

  useEffect(() => {
    if (editor && !editor.isDestroyed && data) {
      editor.commands.replaceRoot(blocksToJSONContents(data.childrenBlocks as Block[])[0])
    }
  }, [editor, data])

  useDocumentSubscription({
    docid,
    editor
  })

  if (loading) {
    return <Skeleton />
  }

  if (!docid) {
    return (
      <div className={styles.page}>
        <Input.TextArea className={styles.titleInput} placeholder="Untitled" autoSize={true} />
        <EditorContent editor={editor} />
      </div>
    )
  }

  if (!data) {
    return <Alert message="Page not found" type="error" />
  }

  return (
    <div className={styles.page}>
      <Input.TextArea className={styles.titleInput} placeholder="Untitled" autoSize={true} />
      <EditorContent editor={editor} />
    </div>
  )
}
