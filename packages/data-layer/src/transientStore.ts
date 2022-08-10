import { BehaviorSubject } from 'rxjs'
import { produce } from 'immer'
import { createContext, useContext } from 'react'

export interface TransientState {
  isSaving: boolean
}

export const initialTransientState: TransientState = {
  isSaving: false
}

export class TransientStore extends BehaviorSubject<TransientState> {
  update(recipe: (draft: TransientState) => void): void {
    this.next(produce(this.value, recipe))
  }
}

const TransientStoreContext = createContext<TransientStore | undefined>(undefined)

export const TransientStoreProvider = TransientStoreContext.Provider

export function useTransientStore(): TransientStore {
  const transientStore = useContext(TransientStoreContext)
  if (!transientStore) {
    throw new Error('useTransientStore() must be used within a <TransientStoreProvider>')
  }
  return transientStore
}
