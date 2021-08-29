describe('document meta', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('should add document cover', () => {
    cy.visit('/')
    cy.findAllByPlaceholderText('Untitled').focus()
    cy.focused().realHover()
    cy.findByText('Add cover').realClick()
    cy.get('[style="background: rgb(95, 95, 95);"]').click()
    cy.get('[style="background-image: unset; background-color: rgb(95, 95, 95);"]').should('exist').realHover()
    cy.findByText('Change cover').realClick()
    cy.get('[style="background: rgb(212, 55, 48);"]').click()
    cy.get('[style="background-image: unset; background-color: rgb(212, 55, 48);"]').should('exist')
  })
})
