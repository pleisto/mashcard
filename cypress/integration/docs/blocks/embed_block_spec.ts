import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('embedBlock', () => {
  before(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
  })

  describe('external link', () => {
    it('embeds link by input link', () => {
      cy.addBlock('upload')
      cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.input.id).focus().type('https://www.github.com')
      cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.button.id).click()
      cy.findByTestId(TEST_ID_ENUM.editor.embedBlock.link.id).should('exist')
    })
  })
})
