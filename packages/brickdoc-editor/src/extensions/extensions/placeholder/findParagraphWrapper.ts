import { Node as ProsemirrorNode, ResolvedPos } from 'prosemirror-model'
import { findParentNodeClosestToPos } from '@tiptap/react'
import { meta as listItemMeta } from '../../blocks/listItem/meta'
import { meta as taskItemMeta } from '../../blocks/taskItem/meta'
import { meta as blockquoteMeta } from '../../blocks/blockquote/meta'
import { meta as calloutMeta } from '../../blocks/callout/meta'

const wrapperList = [listItemMeta.name, taskItemMeta.name, blockquoteMeta.name, calloutMeta.name]

export const findParagraphWrapper = (position: ResolvedPos): ProsemirrorNode | undefined =>
  findParentNodeClosestToPos(position, node => wrapperList.includes(node.type.name))?.node
