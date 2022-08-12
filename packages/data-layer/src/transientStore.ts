import { createStore as createElfStore, withProps } from '@ngneat/elf'
import { createContext, useContext } from 'react'
import { MainEditorTransientState, mainEditorInitialTransientState } from './services/mainEditor'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createStore() {
  return createElfStore(
    {
      name: 'transient'
    },
    withProps<MainEditorTransientState>(mainEditorInitialTransientState)
  )
}

export type TransientStore = ReturnType<typeof createStore>

export const TransientStoreContext = createContext<TransientStore | undefined>(undefined)

export const TransientStoreProvider = TransientStoreContext.Provider

export function useTransientStore(): TransientStore {
  const transientStore = useContext(TransientStoreContext)
  if (!transientStore) {
    throw new Error('useTransientStore() must be used within a <TransientStoreProvider>')
  }
  return transientStore
}
