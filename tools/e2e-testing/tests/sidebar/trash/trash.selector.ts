export const TRASH_SELECTOR = {
  trashButton: 'button[data-testid=trash-button]',
  trashTitle: 'main.content title h1',
  trashSearchInput: 'main.content title .MuiInput-input',
  trashItems: 'main.content ul li[data-testid=trash-pageItem]',
  trashItemTitle: (nth: number) => `main.content ul li span[data-testid=trash-pageItem-title] >> nth=${nth}`,
  trashItemPath: (nth: number) => `main.content ul li div[data-testid=trash-pageItem-path] >> nth=${nth}`,
  trashItemIcon: (nth: number) => `main.content ul li span[data-testid=trash-pageItem-icon] >> nth=${nth}`,
  trashItemRestoreButton: (nth: number) =>
    `main.content ul li button[data-testid=trash-pageItem-button-restore] >> nth=${nth}`,
  trashItemRemoveButton: (nth: number) =>
    `main.content ul li button[data-testid=trash-pageItem-button-remove] >> nth=${nth}`,
  trashItemCheckbox: (nth: number) =>
    `main.content ul li div[data-testid=trash-pageItem-button-checkbox] >> nth=${nth}`,
  trashSelectedCount: 'main.content span[data-testid=trash-selectedBar-count]',
  trashIndeterminate: 'main.content div[data-testid=trash-selectedBar-button-checkbox]:has-text("-")',
  trashSelectedAll: 'main.content div[data-testid=trash-selectedBar-button-checkbox] span.brd-icon-check-box',
  trashSelectedRestore: 'main.content button[data-testid=trash-selectedBar-button-restore]',
  trashSelectedRemove: 'main.content button[data-testid=trash-selectedBar-button-remove]'
}
