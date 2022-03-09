import { useContext, useEffect, useState } from 'react'
import { Node as ProsemirrorNode, Mark } from 'prosemirror-model'
import { debounce } from '@brickdoc/active-support'
import { EditorContext } from '../../context/EditorContext'
import { name as discussionName } from '../../extensions/discussion/name'

export interface CommentedNode {
  markId: string
  node: ProsemirrorNode
  domNode: Node
}

const findDiscussionMark = (marks: Mark[]) => marks.find(mark => mark.type.name === discussionName)
const isCommentedNodeExist = (nodes: CommentedNode[], markId: string) => nodes.some(node => node.markId === markId)

export function useCommentedNodes(): [CommentedNode[]] {
  const { editor } = useContext(EditorContext)
  const [commentedNodes, setCommentedNodes] = useState<CommentedNode[]>([])

  useEffect(() => {
    const getCommentedNodes = debounce(() => {
      const newCommentedNodes: CommentedNode[] = []
      editor?.state.doc.descendants((node, pos) => {
        const discussionMark = findDiscussionMark(node.marks)
        if (!discussionMark) return
        if (isCommentedNodeExist(newCommentedNodes, discussionMark.attrs.markId)) return

        let domNode = editor.view.nodeDOM(pos)
        if (domNode?.nodeType === Node.TEXT_NODE) domNode = domNode.parentElement
        if (!domNode) return

        newCommentedNodes.push({
          node,
          domNode,
          markId: discussionMark.attrs.markId
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
