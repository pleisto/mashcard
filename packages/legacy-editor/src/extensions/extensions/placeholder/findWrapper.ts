import { Node as ProsemirrorNode, ResolvedPos } from 'prosemirror-model'
import { findParentNodeClosestToPos } from '@tiptap/core'
import { meta as listItemMeta } from '../../blocks/listItem/meta'
import { meta as taskItemMeta } from '../../blocks/taskItem/meta'
import { meta as blockquoteMeta } from '../../blocks/blockquote/meta'
import { meta as calloutMeta } from '../../blocks/callout/meta'
import { meta as headingMeta } from '../../blocks/heading/meta'
import { meta as codeBlockMeta } from '../../blocks/codeBlock/meta'

const paragraphWrapperList = [listItemMeta.name, taskItemMeta.name, blockquoteMeta.name, calloutMeta.name]
const wrapperList = [...paragraphWrapperList, headingMeta.name, codeBlockMeta.name]

export const findWrapper = (position: ResolvedPos): ProsemirrorNode | undefined =>
  findParentNodeClosestToPos(position, node => wrapperList.includes(node.type.name))?.node

export const findParagraphWrapper = (position: ResolvedPos): ProsemirrorNode | undefined =>
  findParentNodeClosestToPos(position, node => paragraphWrapperList.includes(node.type.name))?.node
