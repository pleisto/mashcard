export const BREADCRUMB_SELECTOR = {
  breadcrumbText: (index: number) => `[data-testid="layout-header-path-bread-crumb"] div a >> nth=${index}`,
  breadcrumbIcon: (index: number) => `[data-testid="layout-header-path-bread-crumb"] div > span >> nth=${index}`,
  breadcrumbItem: '[data-testid="layout-header-path-bread-crumb"] div'
}
