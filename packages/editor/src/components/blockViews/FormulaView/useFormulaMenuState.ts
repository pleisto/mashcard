import create from 'zustand'

type View = string

export interface FormulaMenuStore {
  state: null | View
  tryOpenMenu: (view: View) => boolean
  closeMenu: () => void
}

// Ensure only one menu can be open at a time
export const useFormulaMenuStore = create<FormulaMenuStore>((set, get) => ({
  state: null,
  tryOpenMenu(view: View) {
    if (get().state !== null) {
      return false
    }
    set({ state: view })
    return true
  },
  closeMenu() {
    set({ state: null })
  }
}))
