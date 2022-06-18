import { useEffect, useState } from 'react'
import { Node as ProsemirrorNode, Mark } from 'prosemirror-model'
import { debounce } from '@brickdoc/active-support'
import { meta as discussionMeta } from '../../../extensions/marks/discussion/meta'
import { useEditorContext } from '../../../hooks'

export interface CommentedNode {
  markId: string
  node: ProsemirrorNode
  domNode: Node
  position: number
}

const findDiscussionMark = (marks: readonly Mark[]): Mark | undefined =>
  marks.find(mark => mark.type.name === discussionMeta.name)
const isCommentedNodeExist = (nodes: CommentedNode[], markId: string): boolean =>
  nodes.some(node => node.markId === markId)

export function useCommentedNodes(): [CommentedNode[]] {
  const { editor } = useEditorContext()
  const [commentedNodes, setCommentedNodes] = useState<CommentedNode[]>([])

  useEffect(() => {
    const getCommentedNodes = debounce(() => {
      const newCommentedNodes: CommentedNode[] = []
      editor?.state.doc.descendants((node, position) => {
        const discussionMark = findDiscussionMark(node.marks)
        if (!discussionMark) return
        if (isCommentedNodeExist(newCommentedNodes, discussionMark.attrs.markId)) return

        let domNode = editor.view.nodeDOM(position)
        if (domNode?.nodeType === Node.TEXT_NODE) domNode = domNode.parentElement
        if (!domNode) return

        newCommentedNodes.push({
          node,
          domNode,
          markId: discussionMark.attrs.markId,
          position
        })
      })
      setCommentedNodes(newCommentedNodes)
    }, 200)

    // get nodes when document created
    // TODO: setTimeout for waiting for document created, find a better solution
    setTimeout(() => getCommentedNodes(), 100)

    editor?.on('update', getCommentedNodes)

    return () => {
      editor?.off('update', getCommentedNodes)
    }
  }, [editor])

  return [commentedNodes]
}
