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
} from '../components/Icon'

export type BlockItemKey =
  | 'text'
  | 'formula'
  | 'spreadsheet'
  | 'upload'
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
  alias?: string[]
  squareIcon: React.ReactElement
  icon: React.ReactElement
  setBlock: (chain: ChainedCommands) => ChainedCommands
  toggleBlock: (chain: ChainedCommands) => ChainedCommands
  insertBlockAt: (chain: ChainedCommands, position: number) => ChainedCommands
}

export const TEXT: BlockCommandItem = {
  key: 'text',
  squareIcon: <TextStyle square={true} />,
  icon: <TextStyle />,
  setBlock: chain => chain.setParagraph(),
  toggleBlock: chain => chain.setParagraph(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Paragraph.name }, position)
}

export const FORMULA: BlockCommandItem = {
  key: 'formula',
  alias: ['for'],
  squareIcon: <Formula square={true} />,
  icon: <Formula />,
  setBlock: chain => chain.setFormulaBlock(),
  toggleBlock: chain => chain.toggleFormula(),
  insertBlockAt: (chain, position) => chain.insertFormulaBlock(position)
}

export const SPREADSHEET: BlockCommandItem = {
  key: 'spreadsheet',
  alias: ['table'],
  squareIcon: <Table square={true} />,
  icon: <Table />,
  setBlock: chain => chain.setSpreadsheetBlock(),
  toggleBlock: chain => chain.setSpreadsheetBlock(),
  insertBlockAt: (chain, position) => chain.setSpreadsheetBlock(position)
}

export const UPLOAD: BlockCommandItem = {
  key: 'upload',
  alias: ['up', 'file', 'pdf', 'excel', 'ppt', 'image', 'img'],
  squareIcon: <Upload square={true} />,
  icon: <Upload />,
  setBlock: chain => chain.setEmbedBlock(Embedtype.Upload),
  toggleBlock: chain => chain.setEmbedBlock(Embedtype.Upload),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(Embedtype.Upload, undefined, position)
}

export const GALLERY: BlockCommandItem = {
  key: 'gallery',
  alias: ['gal'],
  squareIcon: <Unsplash square={true} />,
  icon: <Unsplash />,
  setBlock: chain => chain.setEmbedBlock(Embedtype.Gallery),
  toggleBlock: chain => chain.setEmbedBlock(Embedtype.Gallery),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(Embedtype.Gallery, undefined, position)
}

export const LINK: BlockCommandItem = {
  key: 'link',
  alias: ['link'],
  squareIcon: <Link square={true} />,
  icon: <Link />,
  setBlock: chain => chain.setEmbedBlock(Embedtype.Link),
  toggleBlock: chain => chain.setEmbedBlock(Embedtype.Link),
  insertBlockAt: (chain, position) => chain.setEmbedBlock(Embedtype.Link, undefined, position)
}

export const HEADING_1: BlockCommandItem = {
  key: 'h1',
  alias: ['h1', 'heading 1'],
  squareIcon: <RteH1 square={true} />,
  icon: <RteH1 />,
  setBlock: chain => chain.setHeading({ level: 1 }),
  toggleBlock: chain => chain.toggleHeading({ level: 1 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 1 } }, position)
}

export const HEADING_2: BlockCommandItem = {
  key: 'h2',
  alias: ['h2', 'heading 2'],
  squareIcon: <RteH2 square={true} />,
  icon: <RteH2 />,
  setBlock: chain => chain.setHeading({ level: 2 }),
  toggleBlock: chain => chain.toggleHeading({ level: 2 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 2 } }, position)
}

export const HEADING_3: BlockCommandItem = {
  key: 'h3',
  alias: ['h3', 'heading 3'],
  squareIcon: <RteH3 square={true} />,
  icon: <RteH3 />,
  setBlock: chain => chain.setHeading({ level: 3 }),
  toggleBlock: chain => chain.toggleHeading({ level: 3 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 3 } }, position)
}

export const HEADING_4: BlockCommandItem = {
  key: 'h4',
  alias: ['h4', 'heading 4'],
  squareIcon: <RteH4 square={true} />,
  icon: <RteH4 />,
  setBlock: chain => chain.setHeading({ level: 4 }),
  toggleBlock: chain => chain.toggleHeading({ level: 4 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 4 } }, position)
}

export const HEADING_5: BlockCommandItem = {
  key: 'h5',
  alias: ['h5', 'heading 5'],
  squareIcon: <RteH5 square={true} />,
  icon: <RteH5 />,
  setBlock: chain => chain.setHeading({ level: 5 }),
  toggleBlock: chain => chain.toggleHeading({ level: 5 }),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: Heading.name, attrs: { level: 5 } }, position)
}

export const BULLETED_LIST: BlockCommandItem = {
  key: 'bulletedList',
  alias: ['bul'],
  squareIcon: <ListUnordered square={true} />,
  icon: <ListUnordered />,
  setBlock: chain => chain.wrapInBrickList(BulletList.name),
  toggleBlock: chain => chain.toggleBulletList(),
  insertBlockAt: (chain, position) =>
    chain.insertBlockAt({ type: Paragraph.name }, position).wrapInBrickList(BulletList.name)
}

export const ORDERED_LIST: BlockCommandItem = {
  key: 'orderedList',
  alias: ['num', 'numberedList'],
  squareIcon: <ListOrdered square={true} />,
  icon: <ListOrdered />,
  setBlock: chain => chain.wrapInBrickList(OrderedList.name),
  toggleBlock: chain => chain.toggleOrderedList(),
  insertBlockAt: (chain, position) =>
    chain.insertBlockAt({ type: Paragraph.name }, position).wrapInBrickList(OrderedList.name)
}

export const CODE: BlockCommandItem = {
  key: 'code',
  alias: ['co'],
  squareIcon: <Code square={true} />,
  icon: <Code />,
  setBlock: chain => chain.setCodeBlock(),
  toggleBlock: chain => chain.toggleCodeBlock(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: CodeBlock.name }, position)
}

export const DIVIDER: BlockCommandItem = {
  key: 'divider',
  alias: ['div', 'hr'],
  squareIcon: <Divider square={true} />,
  icon: <Divider />,
  setBlock: chain => chain.setHorizontalRule(),
  toggleBlock: chain => chain.setHorizontalRule(),
  insertBlockAt: (chain, position) => chain.insertBlockAt({ type: HorizontalRule.name }, position)
}

export const TOC: BlockCommandItem = {
  key: 'toc',
  alias: ['toc', 'table of content'],
  squareIcon: <Toc square={true} />,
  icon: <Toc />,
  setBlock: chain => chain.setTocBlock(),
  toggleBlock: chain => chain.setTocBlock(),
  insertBlockAt: (chain, position) => chain.setTocBlock(position)
}

export const SUB_PAGE_MENU: BlockCommandItem = {
  key: 'subPageMenu',
  alias: ['sub'],
  squareIcon: <MindmapList square={true} />,
  icon: <MindmapList />,
  setBlock: chain => chain.setSubPageMenuBlock(),
  toggleBlock: chain => chain.setSubPageMenuBlock(),
  insertBlockAt: (chain, position) => chain.setSubPageMenuBlock(position)
}

export const BLOCK = {
  TEXT,
  FORMULA,
  SPREADSHEET,
  UPLOAD,
  GALLERY,
  LINK,
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
  TEXT.key,
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
  TEXT.key,
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
