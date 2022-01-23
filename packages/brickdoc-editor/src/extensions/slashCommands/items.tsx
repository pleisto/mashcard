import { Embedtype } from '@brickdoc/schema'
import { SlashMenuItem } from '../../components'
import * as EditorIcon from '../../components/Icon'
import { getRecentItemKey } from './recentItemsManager'

const FORMULA = {
  key: 'formula',
  alias: ['for'],
  icon: <EditorIcon.Formula square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setFormulaBlock().run()
  }
}
const SPREADSHEET = {
  key: 'spreadsheet',
  alias: ['table'],
  icon: <EditorIcon.Table square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setTableBlock().run()
  }
}
const UPLOAD = {
  key: 'upload',
  alias: ['up', 'file', 'pdf', 'excel', 'ppt', 'image', 'img'],
  icon: <EditorIcon.Upload square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().deleteRange(range).setEmbedBlock(Embedtype.Upload).run()
  }
}
const GALLERY = {
  key: 'gallery',
  alias: ['gal'],
  icon: <EditorIcon.Unsplash square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().deleteRange(range).setEmbedBlock(Embedtype.Gallery).run()
  }
}
const LINK = {
  key: 'link',
  alias: ['link'],
  icon: <EditorIcon.Link square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().deleteRange(range).setEmbedBlock(Embedtype.Link).run()
  }
}

const HEADING_1 = {
  key: 'h1',
  alias: ['h1', 'heading 1'],
  icon: <EditorIcon.RteH1 square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
  }
}
const HEADING_2 = {
  key: 'h2',
  alias: ['h2', 'heading 2'],
  icon: <EditorIcon.RteH2 square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
  }
}
const HEADING_3 = {
  key: 'h3',
  alias: ['h3', 'heading 3'],
  icon: <EditorIcon.RteH3 square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
  }
}
const HEADING_4 = {
  key: 'h4',
  alias: ['h4', 'heading 4'],
  icon: <EditorIcon.RteH4 square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
  }
}
const HEADING_5 = {
  key: 'h5',
  alias: ['h5', 'heading 5'],
  icon: <EditorIcon.RteH5 square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setNode('heading', { level: 5 }).run()
  }
}
const BULLETED_LIST = {
  key: 'bulletedList',
  alias: ['bul'],
  icon: <EditorIcon.ListUnordered square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).wrapInBrickList('bulletList').run()
  }
}
const ORDERED_LIST = {
  key: 'orderedList',
  alias: ['num', 'numberedList'],
  icon: <EditorIcon.ListOrdered square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).wrapInBrickList('orderedList').run()
  }
}
const CODE = {
  key: 'code',
  alias: ['co'],
  icon: <EditorIcon.Code square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setCodeBlock().run()
  }
}
const DIVIDER = {
  key: 'divider',
  alias: ['div', 'hr'],
  icon: <EditorIcon.Divider square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setHorizontalRule().run()
  }
}
const TOC = {
  key: 'toc',
  alias: ['toc', 'table of content'],
  icon: <EditorIcon.Toc square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setTocBlock().run()
  }
}
const SUB_PAGE_MENU = {
  key: 'subPageMenu',
  alias: ['sub'],
  icon: <EditorIcon.MindmapList square={true} />,
  command: ({ editor, range }: Parameters<SlashMenuItem['command']>[0]) => {
    editor.chain().focus().deleteRange(range).setSubPageMenuBlock().run()
  }
}

export const slashMenuGroup = [
  {
    key: 'data',
    items: [FORMULA, SPREADSHEET]
  },
  {
    key: 'embed',
    items: [UPLOAD, LINK, GALLERY]
  },
  {
    key: 'text',
    items: [HEADING_1, HEADING_2, HEADING_3, HEADING_4, HEADING_5, BULLETED_LIST, ORDERED_LIST, CODE]
  },
  {
    key: 'others',
    items: [DIVIDER, TOC, SUB_PAGE_MENU]
  }
]

const slashMenuItems = [
  FORMULA,
  SPREADSHEET,
  UPLOAD,
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
]

export const TYPE_ITEMS: SlashMenuItem[] = [
  FORMULA,
  UPLOAD,
  LINK,
  GALLERY,
  TOC,
  SUB_PAGE_MENU,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  ORDERED_LIST,
  BULLETED_LIST,
  CODE,
  DIVIDER
]

const RECENT_COUNT = 6

export const getRecentItems = (): SlashMenuItem[] => {
  return getRecentItemKey()
    .map(key => slashMenuItems.find(i => i.key === key))
    .filter(i => !!i)
    .slice(0, RECENT_COUNT) as SlashMenuItem[]
}

const SUGGESTION_COUNT = 5

export const getSuggestionItems = (query: string): SlashMenuItem[] => {
  if (!query) return []
  return slashMenuItems
    .filter(item => [item.key, ...(item.alias ?? [])].some(name => name.toLowerCase().startsWith(query.toLowerCase())))
    .slice(0, SUGGESTION_COUNT)
}
