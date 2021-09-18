describe('edit profile', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('should change avatar', () => {
    cy.visit('/')
    cy.get('.brk-avatar').click()
    cy.findByText('Profile').click()
    cy.findByTestId('profile-form-item-avatar').click()
    cy.findByText('Upload').click()
    cy.get('input[type=file]').attachFile('images/test.png').should('be.ok')
  })
})
