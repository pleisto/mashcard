import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('document title', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('changes bread crumb when updating title', () => {
    const newTitle = 'new title'
    cy.visit('/')
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).type(newTitle)
    cy.findByTestId(TEST_ID_ENUM.layout.header.PathBreadcrumb.id).should('contain.text', newTitle)
  })
})
