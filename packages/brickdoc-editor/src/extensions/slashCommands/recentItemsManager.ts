import { uniq } from 'lodash'
const STORAGE_KEY = 'brickdoc-slash-menu-recent-items'

export function getRecentItemKey(): string[] {
  return (localStorage.getItem(STORAGE_KEY) ?? '').split(',').filter(i => !!i)
}

export function addItemKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, uniq([key, ...getRecentItemKey()]).join(','))
}
