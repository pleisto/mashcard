import { ChainedCommands } from '@tiptap/core'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { Embedtype } from '@brickdoc/schema'
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
  TextStyle
} from '../components/ui'
import { meta as formulaMeta } from '../extensions/blocks/formula/meta'
import { meta as spreadsheetMeta } from '../extensions/blocks/spreadsheet/meta'
import { meta as embedMeta } from '../extensions/blocks/embed/meta'
import { meta as subPageMenuMeta } from '../extensions/blocks/subPageMenu/meta'
import { meta as tocMeta } from '../extensions/blocks/toc/meta'

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

export const PARAPGRAPH: BlockCommandItem = {
  key: 'text',
  blockType: Paragraph.name,
  squareIcon: <TextStyle square={true} />,
  icon: <TextStyle />,
  setBlock: chain => chain.setParagraph().liftBrickList(),
  toggleBlock: chain => chain.setParagraph().liftBrickList(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Paragraph.name }, position)
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
  alias: ['up', 'file', 'pdf', 'excel', 'ppt', 'image', 'img'],
  squareIcon: <Upload square={true} />,
  icon: <Upload />,
  setBlock: chain => chain.setEmbedBlock(Embedtype.Upload),
  toggleBlock: chain => chain.setEmbedBlock(Embedtype.Upload),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(Embedtype.Upload, undefined, position)
}

export const GALLERY: BlockCommandItem = {
  key: 'gallery',
  blockType: embedMeta.name,
  alias: ['gal'],
  squareIcon: <Unsplash square={true} />,
  icon: <Unsplash />,
  setBlock: chain => chain.setEmbedBlock(Embedtype.Gallery),
  toggleBlock: chain => chain.setEmbedBlock(Embedtype.Gallery),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(Embedtype.Gallery, undefined, position)
}

export const LINK: BlockCommandItem = {
  key: 'link',
  blockType: embedMeta.name,
  alias: ['link'],
  squareIcon: <Link square={true} />,
  icon: <Link />,
  setBlock: chain => chain.setEmbedBlock(Embedtype.Link),
  toggleBlock: chain => chain.setEmbedBlock(Embedtype.Link),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(Embedtype.Link, undefined, position)
}

export const EMBED: BlockCommandItem = {
  ...LINK,
  key: 'embed',
  alias: ['em']
}

export const HEADING_1: BlockCommandItem = {
  key: 'h1',
  blockType: Heading.name,
  alias: ['h1', 'heading 1'],
  squareIcon: <RteH1 square={true} />,
  icon: <RteH1 />,
  setBlock: chain => chain.setHeading({ level: 1 }),
  toggleBlock: chain => chain.toggleHeading({ level: 1 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 1 } }, position)
}

export const HEADING_2: BlockCommandItem = {
  key: 'h2',
  blockType: Heading.name,
  alias: ['h2', 'heading 2'],
  squareIcon: <RteH2 square={true} />,
  icon: <RteH2 />,
  setBlock: chain => chain.setHeading({ level: 2 }),
  toggleBlock: chain => chain.toggleHeading({ level: 2 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 2 } }, position)
}

export const HEADING_3: BlockCommandItem = {
  key: 'h3',
  blockType: Heading.name,
  alias: ['h3', 'heading 3'],
  squareIcon: <RteH3 square={true} />,
  icon: <RteH3 />,
  setBlock: chain => chain.setHeading({ level: 3 }),
  toggleBlock: chain => chain.toggleHeading({ level: 3 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 3 } }, position)
}

export const HEADING_4: BlockCommandItem = {
  key: 'h4',
  blockType: Heading.name,
  alias: ['h4', 'heading 4'],
  squareIcon: <RteH4 square={true} />,
  icon: <RteH4 />,
  setBlock: chain => chain.setHeading({ level: 4 }),
  toggleBlock: chain => chain.toggleHeading({ level: 4 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 4 } }, position)
}

export const HEADING_5: BlockCommandItem = {
  key: 'h5',
  blockType: Heading.name,
  alias: ['h5', 'heading 5'],
  squareIcon: <RteH5 square={true} />,
  icon: <RteH5 />,
  setBlock: chain => chain.setHeading({ level: 5 }),
  toggleBlock: chain => chain.toggleHeading({ level: 5 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 5 } }, position)
}

export const BULLETED_LIST: BlockCommandItem = {
  key: 'bulletedList',
  blockType: BulletList.name,
  alias: ['bul'],
  squareIcon: <ListUnordered square={true} />,
  icon: <ListUnordered />,
  setBlock: chain => chain.setToBrickList(BulletList.name),
  toggleBlock: chain => chain.toggleBrickList(BulletList.name),
  insertBlockAt: (chain, position) =>
    chain.insertBlockAt({ type: Paragraph.name }, position).wrapInBrickList(BulletList.name)
}

export const ORDERED_LIST: BlockCommandItem = {
  key: 'orderedList',
  blockType: OrderedList.name,
  alias: ['num', 'numberedList'],
  squareIcon: <ListOrdered square={true} />,
  icon: <ListOrdered />,
  setBlock: chain => chain.setToBrickList(OrderedList.name),
  toggleBlock: chain => chain.toggleBrickList(OrderedList.name),
  insertBlockAt: (chain, position) =>
    chain.insertBlockAt({ type: Paragraph.name }, position).wrapInBrickList(OrderedList.name)
}

export const CODE: BlockCommandItem = {
  key: 'code',
  blockType: CodeBlock.name,
  alias: ['co'],
  squareIcon: <Code square={true} />,
  icon: <Code />,
  setBlock: chain => chain.setCodeBlock(),
  toggleBlock: chain => chain.toggleCodeBlock(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: CodeBlock.name }, position)
}

export const DIVIDER: BlockCommandItem = {
  key: 'divider',
  blockType: HorizontalRule.name,
  alias: ['div', 'hr'],
  squareIcon: <Divider square={true} />,
  icon: <Divider />,
  setBlock: chain => chain.setHorizontalRule(),
  toggleBlock: chain => chain.setHorizontalRule(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: HorizontalRule.name }, position)
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

export const BLOCK = {
  PARAPGRAPH,
  FORMULA,
  SPREADSHEET,
  UPLOAD,
  GALLERY,
  LINK,
  EMBED,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  BULLETED_LIST,
  ORDERED_LIST,
  CODE,
  DIVIDER,
  TOC,
  SUB_PAGE_MENU
}

export const ORDER_NEW_BLOCK: BlockItemKey[] = [
  PARAPGRAPH.key,
  FORMULA.key,
  SPREADSHEET.key,
  UPLOAD.key,
  GALLERY.key,
  LINK.key,
  HEADING_1.key,
  HEADING_2.key,
  HEADING_3.key,
  HEADING_4.key,
  HEADING_5.key,
  BULLETED_LIST.key,
  ORDERED_LIST.key,
  CODE.key,
  DIVIDER.key,
  TOC.key,
  SUB_PAGE_MENU.key
]

export const ORDER_TOGGLE_BLOCK: BlockItemKey[] = [
  PARAPGRAPH.key,
  HEADING_1.key,
  HEADING_2.key,
  HEADING_3.key,
  HEADING_4.key,
  HEADING_5.key,
  ORDERED_LIST.key,
  BULLETED_LIST.key,
  FORMULA.key,
  CODE.key
]

export const sortBlock =
  (ORDER: BlockItemKey[], keyGetter: (item: any) => string) =>
  (a: unknown, b: unknown): 1 | -1 | 0 => {
    const indexA = ORDER.findIndex(i => i === keyGetter(a))
    const indexB = ORDER.findIndex(i => i === keyGetter(b))

    if (indexA > indexB) return 1
    if (indexA === indexB) return 0
    return -1
  }

export const unselectableBlockType = [
  'imageBlock',
  embedMeta.name,
  HorizontalRule.name,
  tocMeta.name,
  subPageMenuMeta.name,
  spreadsheetMeta.name
]
export const paragraphLikeBlockType = [Paragraph.name, Heading.name]
