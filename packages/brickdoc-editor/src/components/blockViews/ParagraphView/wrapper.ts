import { findParentNodeClosestToPos } from '@tiptap/react'
import { ResolvedPos, Node as ProseMirrorNode } from 'prosemirror-model'
import { meta as listItemMeta } from '../../../extensions/blocks/listItem/meta'
import { meta as taskItemMeta } from '../../../extensions/blocks/taskItem/meta'
import { meta as blockquoteMeta } from '../../../extensions/blocks/blockquote/meta'
import { meta as calloutMeta } from '../../../extensions/blocks/callout/meta'

const wrapperList = [listItemMeta.name, taskItemMeta.name, blockquoteMeta.name, calloutMeta.name]

export const findWrapper = (position: ResolvedPos): ProseMirrorNode | undefined =>
  findParentNodeClosestToPos(position, node => wrapperList.includes(node.type.name))?.node
