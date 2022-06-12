export const COMMON_SELECTORS = {
  tooltip: '[role="tooltip"]',
  menubarItems: '[role="menubar"] li[role=menuitem]',
  dialog: {
    component: 'div[role=presentation]',
    cancelButton: 'div[role=presentation] button:has-text("Cancel")',
    deleteButton: 'div[role=presentation] button:has-text("Delete Page")'
  }
}
