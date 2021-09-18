describe('tableBlockPagination', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })

    cy.visit('/')
    cy.get('[contenteditable]').type('/table')
    cy.get('button.slash-menu-item:first').click()

    for (let i = 1; i <= 11; i += 1) {
      cy.get('.table-toolbar-add-button').click()
    }
  })

  it('should goto page 2', () => {
    cy.get('.table-block-text-cell').should('have.length', 10)
    cy.findByText('2').click()
    cy.get('.table-block-text-cell').should('have.length', 1)
    cy.findByText('1').click()
    cy.get('.table-block-text-cell').should('have.length', 10)
  })

  it('should stay in page 2 when editing cell', () => {
    cy.findByText('2').click()
    cy.get('.table-block-text-cell').click()
    cy.focused().type('text{Enter}')
    cy.get('.table-block-text-cell').should('have.length', 1)
  })
})
