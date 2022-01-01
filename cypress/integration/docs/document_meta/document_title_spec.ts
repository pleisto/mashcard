import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('document title', () => {
  before(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('changes bread crumb when updating title', () => {
    const newTitle = 'new title'
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).click().type(newTitle, {
      delay: 200,
      waitForAnimations: true
    })
    cy.findByTestId(TEST_ID_ENUM.layout.header.PathBreadcrumb.id).should('contain.text', newTitle)
  })
})
