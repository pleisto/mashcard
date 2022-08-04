import { TEST_ID_ENUM } from '@mashcard/test-helper'

export type Index = number | string

export const BREADCRUMB_SELECTOR = {
  texts: `[data-testid=${TEST_ID_ENUM.layout.header.PathBreadcrumb.item.text.id}]`,
  icons: `[data-testid=${TEST_ID_ENUM.layout.header.PathBreadcrumb.item.emoji.id}]`,
  items: `[data-testid="${TEST_ID_ENUM.layout.header.PathBreadcrumb.id}"] [data-testid=${TEST_ID_ENUM.layout.header.PathBreadcrumb.item.id}]`
}
