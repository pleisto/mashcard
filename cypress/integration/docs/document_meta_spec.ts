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
    cy.get('[style="background: linear-gradient(rgb(251, 147, 147) 0%, rgb(210, 179, 67) 100%);"]').click()
    cy.get('[style="background-image: linear-gradient(rgb(251, 147, 147) 0%, rgb(210, 179, 67) 100%); background-color: unset;"]').should(
      'exist'
    )
    cy.get('[style="background: rgb(212, 55, 48);"]').click()
    cy.get('[style="background-image: unset; background-color: rgb(212, 55, 48);"]').should('exist')
  })
})
