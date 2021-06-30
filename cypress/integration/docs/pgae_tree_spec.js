describe('pageTree', ()=>{
  before(()=>{
    cy.sessionMock({email: 'cypress@example.com'})
  })
  it('should rendered',()=>{
    cy.visit('/')
    // cy.url().should('include', 'accounts/sign_in')
  })
})
