import actualCreate from 'zustand'
import { act } from 'react-dom/test-utils'

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<Function>()

// when creating a store, we get its initial state, create a reset function and add it in the set
const create = (createState: any): ReturnType<typeof actualCreate> => {
  const store = actualCreate(createState)
  const initialState = store.getState()
  storeResetFns.add(() => store.setState(initialState, true))
  return store
}

// Reset all stores after each test run
afterEach(() => {
  act(() => storeResetFns.forEach(resetFn => resetFn()))
})

// eslint-disable-next-line import/no-default-export
export default create
