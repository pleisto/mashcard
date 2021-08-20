describe('document meta', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('basic sync', () => {
    cy.findByText('+ Add Pages').realClick()
    cy.findAllByPlaceholderText('Untitled').focus().type('Title')
    cy.findAllByPlaceholderText('Untitled').should('have.value', 'Title')
    cy.url().should('match', /\/p\//)
    // avoid block unsaved, we need wait for 3s
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000)

    cy.reload(true)
    cy.findAllByPlaceholderText('Untitled').should('have.value', 'Title')
  })
})
