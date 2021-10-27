import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('page sync', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('basic sync', () => {
    cy.visit('/')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.addPageButton.id).click()
    // cy.url().should('match', /\/p\//)
    cy.interceptGQL('blockSyncBatch', ({ variables }) => variables?.input.blocks.some(block => block.meta.title === 'Title'))
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).focus().type('Title')
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).should('have.value', 'Title')
    cy.wait('@gql:blockSyncBatch')
    cy.reload(true)
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).should('have.value', 'Title')
  })
})
