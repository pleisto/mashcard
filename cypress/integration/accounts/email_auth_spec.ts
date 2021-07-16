describe('emailAuth', () => {
  it('should rendered', () => {
    cy.visit('/')
    cy.url().should('include', 'accounts/sign_in')
    cy.get('main h1').contains('Sign in to Brickdoc')
    cy.get('input#email.brk-input').should('be.visible')
  })
})
