import { Page } from '@playwright/test'

/**
 * TODO: the document basic component, contains click/select/left action etc.
 */
export class BaseComponent {
  private readonly page: Page
  constructor(page: Page) {
    this.page = page
  }
}
