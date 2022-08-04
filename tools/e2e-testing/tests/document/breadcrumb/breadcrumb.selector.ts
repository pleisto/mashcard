import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const BREADCRUMB_SELECTOR = {
  breadcrumbText: `[data-testid=${TEST_ID_ENUM.layout.header.PathBreadcrumb.item.text.id}]`,
  breadcrumbIcon: `[data-testid=${TEST_ID_ENUM.layout.header.PathBreadcrumb.item.emoji.id}]`,
  breadcrumbItems: `[data-testid="${TEST_ID_ENUM.layout.header.PathBreadcrumb.id}"] [data-testid=${TEST_ID_ENUM.layout.header.PathBreadcrumb.item.id}]`,
  test: (index: number) => `${index}sdadasd`
}
