export const BASE_SELECTORS = {
  tooltip: '[role="tooltip"]',
  menubarItem: '[role="menubar"] li',
  dialog: {
    component: 'div[role=presentation]',
    cancelButton: 'div[role=presentation] button:has-text("Cancel")',
    deleteButton: 'div[role=presentation] button:has-text("Delete Page")'
  }
}
