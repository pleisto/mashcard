import { BlockCommandItem } from '../../../helpers/block'
import * as BLOCK from '../../../helpers/block'
import { getRecentItemKey, addItemKey } from './recentItemsManager'
import { meta as paragraphMeta } from '../../../extensions/blocks/paragraph/meta'
import { meta as spreadsheetMeta } from '../../../extensions/blocks/spreadsheet/meta'
import { meta as embedMeta } from '../../../extensions/blocks/embed/meta'
import { meta as subPageMenuMeta } from '../../../extensions/blocks/subPageMenu/meta'
import { meta as tocMeta } from '../../../extensions/blocks/toc/meta'
import { meta as horizontalRuleMeta } from '../../../extensions/blocks/horizontalRule/meta'
import { BlockSelectorItem } from './BlockSelector'

const unselectableBlockType = [
  embedMeta.name,
  horizontalRuleMeta.name,
  tocMeta.name,
  subPageMenuMeta.name,
  spreadsheetMeta.name
]

function createBlockSelectorItem(blockItem: BlockCommandItem): BlockSelectorItem {
  return {
    key: blockItem.key,
    alias: blockItem.alias,
    icon: blockItem.squareIcon,
    command: ({ editor, range }: Parameters<BlockSelectorItem['command']>[0]) => {
      let chain = editor.chain()

      if (typeof range !== 'number') {
        chain = chain.deleteRange(range)
      }

      const from = typeof range === 'number' ? range : range.from

      chain = chain.focus(from)
      chain = blockItem.setBlock(chain)

      // create a new line to prevent block from selected
      if (unselectableBlockType.includes(blockItem.blockType)) {
        chain = chain.insertBlockAt({ type: paragraphMeta.name }, from).focus()
      }

      chain.run()

      addItemKey(blockItem.key)
    }
  }
}

const FORMULA = createBlockSelectorItem(BLOCK.FORMULA)
const SPREADSHEET = createBlockSelectorItem(BLOCK.SPREADSHEET)
const UPLOAD = createBlockSelectorItem(BLOCK.UPLOAD)
const LINK = createBlockSelectorItem(BLOCK.LINK)
const EMBED = createBlockSelectorItem(BLOCK.EMBED)
const HEADING_1 = createBlockSelectorItem(BLOCK.HEADING_1)
const HEADING_2 = createBlockSelectorItem(BLOCK.HEADING_2)
const HEADING_3 = createBlockSelectorItem(BLOCK.HEADING_3)
const HEADING_4 = createBlockSelectorItem(BLOCK.HEADING_4)
const HEADING_5 = createBlockSelectorItem(BLOCK.HEADING_5)
const BULLETED_LIST = createBlockSelectorItem(BLOCK.BULLETED_LIST)
const ORDERED_LIST = createBlockSelectorItem(BLOCK.ORDERED_LIST)
const TASK_LIST = createBlockSelectorItem(BLOCK.TASK_LIST)
const CODE = createBlockSelectorItem(BLOCK.CODE)
const BLOCKQUOTE = createBlockSelectorItem(BLOCK.BLOCKQUOTE)
const CALLOUT = createBlockSelectorItem(BLOCK.CALLOUT)
const DIVIDER = createBlockSelectorItem(BLOCK.DIVIDER)
const TOC = createBlockSelectorItem(BLOCK.TOC)
const SUB_PAGE_MENU = createBlockSelectorItem(BLOCK.SUB_PAGE_MENU)

const items = [
  FORMULA,
  SPREADSHEET,
  UPLOAD,
  LINK,
  EMBED,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  BULLETED_LIST,
  ORDERED_LIST,
  TASK_LIST,
  CODE,
  BLOCKQUOTE,
  CALLOUT,
  DIVIDER,
  TOC,
  SUB_PAGE_MENU
]

export const TYPE_ITEMS: BlockSelectorItem[] = items

const RECENT_COUNT = 6

export const getRecentItems = (): BlockSelectorItem[] => {
  return getRecentItemKey()
    .map(key => items.find(i => i.key === key))
    .filter(i => !!i)
    .slice(0, RECENT_COUNT) as BlockSelectorItem[]
}

const SUGGESTION_COUNT = 5

export const getSuggestionItems = (query?: string): BlockSelectorItem[] => {
  if (!query) return []
  return items
    .filter(item => [item.key, ...(item.alias ?? [])].some(name => name.toLowerCase().startsWith(query.toLowerCase())))
    .slice(0, SUGGESTION_COUNT)
}
