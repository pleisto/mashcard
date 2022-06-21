import * as BLOCK from './block'

export const TRANS_TYPE_LIST = [
  { type: 'normal', items: [BLOCK.PARAGRAPH] },
  { type: 'heading', items: [BLOCK.HEADING_1, BLOCK.HEADING_2, BLOCK.HEADING_3, BLOCK.HEADING_4, BLOCK.HEADING_5] },
  {
    type: 'block',
    items: [BLOCK.ORDERED_LIST, BLOCK.BULLETED_LIST, BLOCK.TASK_LIST, BLOCK.FORMULA, BLOCK.CODE, BLOCK.BLOCKQUOTE]
  }
]
