describe('emailAuth', ()=>{
  it('should rendered',()=>{
    cy.visit('/')
    cy.url().should('include', 'accounts/sign_in')
    cy.get('main h1').contains('Sign in to Brickdoc')

    // Click Email Password Auth
    cy.get('button > .brk-icon-mail').parent().click()
    cy.get('input#email.brk-input').should('be.visible')
  })
})
