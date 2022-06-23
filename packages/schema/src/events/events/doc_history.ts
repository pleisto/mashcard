import { DocumentHistory, User } from '../../MashcardModels'
import { event } from '../event'

export const loadDocHistory = event<string>()('loadDocHistory', (docId: string) => {
  return { id: docId }
})

export const docHistoryReceived = event<{
  docId: string
  histories: { [key: string]: DocumentHistory }
  users: { [key: string]: User }
}>()('docHistoryReceived', ({ docId }) => {
  return { id: docId }
})
