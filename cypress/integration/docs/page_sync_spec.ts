describe('document meta', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('basic sync', () => {
    cy.visit('/')
    cy.findByText('+ Add Pages').click()
    cy.url().should('match', /\/p\//)
    // eslint-disable-next-line max-nested-callbacks
    cy.interceptGQL('blockSyncBatch', ({ variables }) => variables?.input.blocks.some(block => block.meta.title === 'Title'))
    cy.findAllByPlaceholderText('Untitled').focus().type('Title')
    cy.findAllByPlaceholderText('Untitled').should('have.value', 'Title')
    cy.wait('@gql:blockSyncBatch')
    cy.reload(true)
    cy.findAllByPlaceholderText('Untitled').should('have.value', 'Title')
  })
})
