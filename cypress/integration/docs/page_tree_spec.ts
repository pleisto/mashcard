describe('pageTree', ()=>{
  before(()=>{
    cy.sessionMock({email: 'cypress@example.com'})
  })
  it('should rendered',()=>{
    cy.visit('/')
    cy.url().should('not.include', 'accounts/sign_in')
  })
})
