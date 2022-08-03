export const COMMON_SELECTORS = {
  tooltip: '[role="tooltip"]',
  errorTooltip: 'span[role="img"].mc-icon.mc-icon-close-one',
  menubarItems: '[role="menubar"] li[role=menuitem]',
  dialog: {
    component: 'div[role=presentation]',
    cancelButton: 'div[role=presentation] button:has-text("Cancel")',
    confirmButton: 'div[role=presentation] button:has-text("Confirm")',
    deletePageButton: 'div[role=presentation] button:has-text("Delete Page")',
    deletePodButton: 'div[role=presentation] button:has-text("Delete Pod")',
    createButton: 'div[role=presentation] button:has-text("Create")',
    input: 'div[role=presentation] .MuiInput-input'
  },
  listBox: {
    listItems: '[role=listbox] [role=option]',
    listItem: (name: string) => `[role=listbox] [role=option]:has-text("${name}")`
  }
}
