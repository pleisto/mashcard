describe('embedBlock', () => {
  before(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
  })

  // eslint-disable-next-line jest/no-commented-out-tests
  /*
  describe('web bookmark', () => {
    it('embeds web bookmark by input link', () => {
      cy.addBlock('link')
      cy.findByTestId(TEST_ID_ENUM.editor.embedBlock.link.input.id).focus().type('https://www.github.com{Enter}')
      cy.findByTestId(TEST_ID_ENUM.editor.embedBlock.link.id).should('exist')
    })
  })
  */
})
