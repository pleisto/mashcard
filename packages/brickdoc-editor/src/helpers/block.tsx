import { ChainedCommands } from '@tiptap/core'
import { EmbedType } from '@brickdoc/schema'
import {
  Code,
  Divider,
  Formula,
  Link,
  ListUnordered,
  ListOrdered,
  MindmapList,
  Table,
  Toc,
  Upload,
  Unsplash,
  RteH1,
  RteH2,
  RteH3,
  RteH4,
  RteH5,
  TextStyle,
  Quote,
  CheckboxSquare,
  Bulb
} from '../components/ui'
import { meta as formulaMeta } from '../extensions/blocks/formula/meta'
import { meta as spreadsheetMeta } from '../extensions/blocks/spreadsheet/meta'
import { meta as embedMeta } from '../extensions/blocks/embed/meta'
import { meta as subPageMenuMeta } from '../extensions/blocks/subPageMenu/meta'
import { meta as tocMeta } from '../extensions/blocks/toc/meta'
import { meta as blockquoteMeta } from '../extensions/blocks/blockquote/meta'
import { meta as taskListMeta } from '../extensions/blocks/taskList/meta'
import { meta as bulletListMeta } from '../extensions/blocks/bulletList/meta'
import { meta as codeBlockMeta } from '../extensions/blocks/codeBlock/meta'
import { meta as headingMeta } from '../extensions/blocks/heading/meta'
import { meta as horizontalRuleMeta } from '../extensions/blocks/horizontalRule/meta'
import { meta as orderedListMeta } from '../extensions/blocks/orderedList/meta'
import { meta as paragraphMeta } from '../extensions/blocks/paragraph/meta'
import { meta as calloutMeta } from '../extensions/blocks/callout/meta'

export type BlockItemKey =
  | 'text'
  | 'formula'
  | 'spreadsheet'
  | 'upload'
  | 'embed'
  | 'gallery'
  | 'link'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'bulletedList'
  | 'orderedList'
  | 'code'
  | 'toc'
  | 'subPageMenu'
  | 'divider'
  | 'blockquote'
  | 'taskList'
  | 'callout'

export interface BlockCommandItem {
  key: BlockItemKey
  blockType: string
  alias?: string[]
  squareIcon: React.ReactElement
  icon: React.ReactElement
  setBlock: (chain: ChainedCommands) => ChainedCommands
  toggleBlock: (chain: ChainedCommands) => ChainedCommands
  insertBlockAt: (chain: ChainedCommands, position: number) => ChainedCommands
}

export const PARAGRAPH: BlockCommandItem = {
  key: 'text',
  blockType: paragraphMeta.name,
  squareIcon: <TextStyle square={true} />,
  icon: <TextStyle />,
  setBlock: chain => chain.setParagraph().liftBrickList(),
  toggleBlock: chain => chain.setParagraph().liftBrickList(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: paragraphMeta.name }, position)
}

export const FORMULA: BlockCommandItem = {
  key: 'formula',
  blockType: formulaMeta.name,
  alias: ['for'],
  squareIcon: <Formula square={true} />,
  icon: <Formula />,
  setBlock: chain => chain.setFormulaBlock(),
  toggleBlock: chain => chain.toggleFormula(),
  insertBlockAt: (chain, position) => chain.insertFormulaBlock(position)
}

export const SPREADSHEET: BlockCommandItem = {
  key: 'spreadsheet',
  blockType: spreadsheetMeta.name,
  alias: ['table'],
  squareIcon: <Table square={true} />,
  icon: <Table />,
  setBlock: chain => chain.setSpreadsheetBlock(),
  toggleBlock: chain => chain.setSpreadsheetBlock(),
  insertBlockAt: (chain, position) => chain.setSpreadsheetBlock(position)
}

export const UPLOAD: BlockCommandItem = {
  key: 'upload',
  blockType: embedMeta.name,
  alias: ['up', 'local', 'file', 'pdf', 'excel', 'ppt', 'image', 'img'],
  squareIcon: <Upload square={true} />,
  icon: <Upload />,
  setBlock: chain => chain.setEmbedBlock(EmbedType.Upload),
  toggleBlock: chain => chain.setEmbedBlock(EmbedType.Upload),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(EmbedType.Upload, undefined, position)
}

export const GALLERY: BlockCommandItem = {
  key: 'gallery',
  blockType: embedMeta.name,
  alias: ['gal'],
  squareIcon: <Unsplash square={true} />,
  icon: <Unsplash />,
  setBlock: chain => chain.setEmbedBlock(EmbedType.Gallery),
  toggleBlock: chain => chain.setEmbedBlock(EmbedType.Gallery),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(EmbedType.Gallery, undefined, position)
}

export const LINK: BlockCommandItem = {
  key: 'link',
  blockType: embedMeta.name,
  alias: ['link'],
  squareIcon: <Link square={true} />,
  icon: <Link />,
  setBlock: chain => chain.setEmbedBlock(EmbedType.Link),
  toggleBlock: chain => chain.setEmbedBlock(EmbedType.Link),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(EmbedType.Link, undefined, position)
}

export const EMBED: BlockCommandItem = {
  ...LINK,
  key: 'embed',
  alias: ['em']
}

export const HEADING_1: BlockCommandItem = {
  key: 'h1',
  blockType: headingMeta.name,
  alias: ['h1', 'heading 1'],
  squareIcon: <RteH1 square={true} />,
  icon: <RteH1 />,
  setBlock: chain => chain.setHeading({ level: 1 }),
  toggleBlock: chain => chain.toggleHeading({ level: 1 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: headingMeta.name, attrs: { level: 1 } }, position)
}

export const HEADING_2: BlockCommandItem = {
  key: 'h2',
  blockType: headingMeta.name,
  alias: ['h2', 'heading 2'],
  squareIcon: <RteH2 square={true} />,
  icon: <RteH2 />,
  setBlock: chain => chain.setHeading({ level: 2 }),
  toggleBlock: chain => chain.toggleHeading({ level: 2 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: headingMeta.name, attrs: { level: 2 } }, position)
}

export const HEADING_3: BlockCommandItem = {
  key: 'h3',
  blockType: headingMeta.name,
  alias: ['h3', 'heading 3'],
  squareIcon: <RteH3 square={true} />,
  icon: <RteH3 />,
  setBlock: chain => chain.setHeading({ level: 3 }),
  toggleBlock: chain => chain.toggleHeading({ level: 3 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: headingMeta.name, attrs: { level: 3 } }, position)
}

export const HEADING_4: BlockCommandItem = {
  key: 'h4',
  blockType: headingMeta.name,
  alias: ['h4', 'heading 4'],
  squareIcon: <RteH4 square={true} />,
  icon: <RteH4 />,
  setBlock: chain => chain.setHeading({ level: 4 }),
  toggleBlock: chain => chain.toggleHeading({ level: 4 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: headingMeta.name, attrs: { level: 4 } }, position)
}

export const HEADING_5: BlockCommandItem = {
  key: 'h5',
  blockType: headingMeta.name,
  alias: ['h5', 'heading 5'],
  squareIcon: <RteH5 square={true} />,
  icon: <RteH5 />,
  setBlock: chain => chain.setHeading({ level: 5 }),
  toggleBlock: chain => chain.toggleHeading({ level: 5 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: headingMeta.name, attrs: { level: 5 } }, position)
}

export const BULLETED_LIST: BlockCommandItem = {
  key: 'bulletedList',
  blockType: bulletListMeta.name,
  alias: ['bul'],
  squareIcon: <ListUnordered square={true} />,
  icon: <ListUnordered />,
  setBlock: chain => chain.setToBrickList(bulletListMeta.name),
  toggleBlock: chain => chain.toggleBrickList(bulletListMeta.name),
  insertBlockAt: (chain, position) =>
    chain.insertBlockAt({ type: paragraphMeta.name }, position).wrapInBrickList(bulletListMeta.name)
}

export const ORDERED_LIST: BlockCommandItem = {
  key: 'orderedList',
  blockType: orderedListMeta.name,
  alias: ['num', 'numberedList'],
  squareIcon: <ListOrdered square={true} />,
  icon: <ListOrdered />,
  setBlock: chain => chain.setToBrickList(orderedListMeta.name),
  toggleBlock: chain => chain.toggleBrickList(orderedListMeta.name),
  insertBlockAt: (chain, position) =>
    chain.insertBlockAt({ type: paragraphMeta.name }, position).wrapInBrickList(orderedListMeta.name)
}

export const TASK_LIST: BlockCommandItem = {
  key: 'taskList',
  blockType: taskListMeta.name,
  alias: ['todo'],
  squareIcon: <CheckboxSquare square={true} />,
  icon: <CheckboxSquare />,
  setBlock: chain => chain.setToBrickList(taskListMeta.name),
  toggleBlock: chain => chain.toggleBrickList(taskListMeta.name),
  insertBlockAt: (chain, position) =>
    chain.insertBlockAt({ type: paragraphMeta.name }, position).wrapInBrickList(taskListMeta.name)
}

export const BLOCKQUOTE: BlockCommandItem = {
  key: 'blockquote',
  blockType: blockquoteMeta.name,
  alias: ['quo'],
  squareIcon: <Quote square={true} />,
  icon: <Quote />,
  setBlock: chain => chain.setBlockquote(),
  toggleBlock: chain => chain.toggleBlockquote(),
  insertBlockAt: (chain, position) => PARAGRAPH.insertBlockAt(chain, position).setBlockquote()
}

export const CODE: BlockCommandItem = {
  key: 'code',
  blockType: codeBlockMeta.name,
  alias: ['co'],
  squareIcon: <Code square={true} />,
  icon: <Code />,
  setBlock: chain => chain.setCodeBlock(),
  toggleBlock: chain => chain.toggleCodeBlock(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: codeBlockMeta.name }, position)
}

export const DIVIDER: BlockCommandItem = {
  key: 'divider',
  blockType: horizontalRuleMeta.name,
  alias: ['div', 'hr'],
  squareIcon: <Divider square={true} />,
  icon: <Divider />,
  setBlock: chain => chain.setHorizontalRule(),
  toggleBlock: chain => chain.setHorizontalRule(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: horizontalRuleMeta.name }, position)
}

export const TOC: BlockCommandItem = {
  key: 'toc',
  blockType: tocMeta.name,
  alias: ['toc', 'table of content'],
  squareIcon: <Toc square={true} />,
  icon: <Toc />,
  setBlock: chain => chain.setTocBlock(),
  toggleBlock: chain => chain.setTocBlock(),
  insertBlockAt: (chain, position) => chain.setTocBlock(position)
}

export const SUB_PAGE_MENU: BlockCommandItem = {
  key: 'subPageMenu',
  blockType: subPageMenuMeta.name,
  alias: ['sub'],
  squareIcon: <MindmapList square={true} />,
  icon: <MindmapList />,
  setBlock: chain => chain.setSubPageMenuBlock(),
  toggleBlock: chain => chain.setSubPageMenuBlock(),
  insertBlockAt: (chain, position) => chain.setSubPageMenuBlock(position)
}

export const CALLOUT: BlockCommandItem = {
  key: 'callout',
  blockType: calloutMeta.name,
  alias: ['call'],
  squareIcon: <Bulb square={true} />,
  icon: <Bulb />,
  setBlock: chain => chain.setCallout(),
  toggleBlock: chain => chain.toggleCallout(),
  insertBlockAt: (chain, position) => PARAGRAPH.insertBlockAt(chain, position).setCallout()
}
