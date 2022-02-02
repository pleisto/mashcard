const STORAGE_KEY = 'brickdoc-slash-menu-recent-items'

export function getRecentItemKey(): string[] {
  return (localStorage.getItem(STORAGE_KEY) ?? '').split(',').filter(i => !!i)
}

export function addItemKey(key: string): void {
  // Use a Set to avoid duplicates
  localStorage.setItem(STORAGE_KEY, [...new Set([key, ...getRecentItemKey()])].join(','))
}
