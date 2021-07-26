import { useNewPatchSubscription, PatchBaseObject, Patchtype, Patchstate } from '@/BrickdocGraphQL'
import { Fragment } from 'prosemirror-model'
import { Editor, ChainedCommands } from '@tiptap/core'
import { EditorProps } from '@brickdoc/editor'
import { blockToNode } from './SyncProvider'

interface SubscriptionProps {
  docid: string
  editor: EditorProps['editor']
}

function applyPatch(patch: PatchBaseObject, editor: Editor, chainedCommands: ChainedCommands): void {
  const block = JSON.parse(patch.payload)
  const newNode = block && blockToNode(block)

  chainedCommands.command(({ tr }) => {
    let targetNode = tr.doc
    if (patch.path[0] !== targetNode.attrs.uuid) {
      console.warn("Root node uuid doesn't match patch.path", tr.doc.attrs?.uuid, patch.path[0])
      return
    }
    let startPos = -1
    if (patch.path.length > 1) {
      patch.path.slice(1).forEach(path => {
        for (let i = 0; i < targetNode.childCount; i += 1) {
          const child = targetNode.child(i)
          if (child.attrs.uuid === path) {
            startPos += 1
            targetNode = child
            return
          }
          startPos += child.nodeSize
        }
        console.warn('Patch path not found', patch.path, tr.doc)
      })
    }

    const endPos = startPos + targetNode.nodeSize

    switch (patch.patchType) {
      case Patchtype.Add:
        tr.insert(endPos - 1, editor.schema.nodeFromJSON(newNode))
        break
      case Patchtype.Update:
        if (patch.path.length < 1) {
          console.warn('Root node cannot be updated')
        } else {
          let newContent = targetNode.content
          if (newNode.content === null) {
            // Clear content
            newContent = undefined
          } else if (newNode.content) {
            // Update content
            newContent = Fragment.fromArray(newNode.content.map(editor.schema.nodeFromJSON))
          }

          const updatedNode = targetNode.copy(newContent)
          const oldSort = targetNode.attrs?.sort
          if (newNode.text) updatedNode.text = newNode.text
          Object.assign(updatedNode.attrs, newNode.attrs)
          tr.replaceWith(startPos, endPos, updatedNode)

          if (newNode.attrs?.sort !== undefined && newNode.attrs.sort !== oldSort) {
            let resolvedPos = tr.doc.resolve(startPos)
            tr.delete(startPos, startPos + updatedNode.nodeSize)

            resolvedPos = tr.doc.resolve(startPos)
            let insertPos = resolvedPos.start()
            for (let i = 0; i < resolvedPos.parent.childCount; i += 1) {
              const child = resolvedPos.parent.child(i)
              if (newNode.attrs.sort <= child.attrs.sort) {
                break
              }
              insertPos += child.nodeSize
            }
            tr.insert(insertPos, updatedNode)
          }
        }
        break
      case Patchtype.Delete:
        if (patch.path.length < 1) {
          console.warn('Root node cannot be deleted')
        } else {
          tr.delete(startPos, endPos)
        }
    }
    return true
  })
}

export function useDocumentSubscription({ docid, editor }: SubscriptionProps): void {
  useNewPatchSubscription({
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (!data?.newPatch?.patches?.length) return
      if (!editor) {
        console.warn('New patch arrived but the editor has not been initialized')
        return
      }

      const { newPatch } = data

      if (newPatch.seq === editor.state.doc.attrs?.seq) {
        console.warn(`Duplicated seq ${newPatch.seq}, ignore...`)
        return
      }

      if (newPatch.state === Patchstate.Deleted) {
        console.log('Delete page ...')
        return
      }

      const patches = newPatch.patches.filter(p => p.operatorId !== globalThis.brickdocContext.uuid)

      if (patches.length === 0) {
        console.log('No available patches, ignore ...')
        return
      }

      // TODO Check seq is increment atomically...

      const chainedCommands = editor.chain()
      patches.forEach(patch => {
        applyPatch(patch, editor, chainedCommands)
      })
      chainedCommands.setDocAttrs({ ...editor.state.doc.attrs, patchSeq: newPatch.seq }).run()
      console.log({ label: 'After Apply', uuid: globalThis.brickdocContext.uuid, patches, newPatch })
    },
    variables: { docId: docid }
  })
}
