import { JSONContent } from '@tiptap/core'

const DRAFT_KEY = (markId: string): string => `mc-comment-draft-${markId}`

export const getDraft = (markId: string): JSONContent | undefined => {
  try {
    const local = window.localStorage.getItem(DRAFT_KEY(markId))
    if (!local) return undefined
    return JSON.parse(local)
  } catch (error) {
    console.error(error)
  }

  return undefined
}

export const setDraft = (markId: string, content: JSONContent): void => {
  try {
    window.localStorage.setItem(DRAFT_KEY(markId), JSON.stringify(content))
  } catch (error) {
    console.error(error)
  }
}

export const clearDraft = (markId: string): void => {
  try {
    window.localStorage.setItem(DRAFT_KEY(markId), '')
  } catch (error) {
    console.error(error)
  }
}
