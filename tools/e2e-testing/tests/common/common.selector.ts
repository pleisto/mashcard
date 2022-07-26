export enum ActionType {
  Cancel = 'Cancel',
  Confirm = 'Confirm',
  'Delete Pod' = 'Delete Pod',
  'Delete Page' = 'Delete Page',
  'Create' = 'Create'
}

export const COMMON_SELECTORS = {
  tooltip: '[role="tooltip"]',
  menubarItems: '[role="menubar"] li[role=menuitem]',
  dialog: {
    component: 'div[role=presentation]',
    cancelButton: 'div[role=presentation] button:has-text("Cancel")',
    deleteButton: 'div[role=presentation] button:has-text("Delete Page")',
    actionButton: (action: ActionType) => `div[role=presentation] button:has-text("${action}")`,
    input: 'div[role=presentation] .MuiInput-input'
  },
  listBox: {
    listItems: '[role=listbox] [role=option]',
    listItem: (name: string) => `[role=listbox] [role=option]:has-text("${name}")`
  }
}
