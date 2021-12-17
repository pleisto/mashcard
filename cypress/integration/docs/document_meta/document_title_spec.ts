import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('document title', () => {
  before(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('changes bread crumb when updating title', () => {
    const newTitle = 'new title'
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).click().wait(500).type(newTitle)
    cy.findByTestId(TEST_ID_ENUM.layout.header.PathBreadcrumb.id).should('contain.text', newTitle)
  })
})
