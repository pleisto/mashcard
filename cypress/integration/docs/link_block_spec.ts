describe('linkBlock', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('should embed link by inputting link', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/embed')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Embed anything').click()
    cy.findByPlaceholderText('Paste in https://...').focus().type('https://www.brickdoc.com')
    cy.findByText('Embed').click()
    cy.get('.brickdoc-link-block').should('exist')
  })

  it('should delete link by clicking Delete button', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/embed')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Embed anything').click()
    cy.findByPlaceholderText('Paste in https://...').focus().type('https://www.brickdoc.com')
    cy.findByText('Embed').click()
    cy.get('.brickdoc-link-block').realHover()
    cy.get('.link-block-menu-button').click()
    cy.findByText('Delete').click()
    cy.get('.brickdoc-link-block').should('not.exist')
  })

  it('should copy link by clicking Copy button', () => {
    cy.visit('/', {
      onBeforeLoad(win: Window): void {
        cy.spy(win.navigator.clipboard, 'writeText').as('copy')
      }
    })
    const link = 'https://www.brickdoc.com'
    cy.get('[contenteditable]').type('/embed')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Embed anything').click()
    cy.findByPlaceholderText('Paste in https://...').focus().type(link)
    cy.findByText('Embed').click()
    cy.get('.brickdoc-link-block').realHover()
    cy.get('.link-block-menu-button').click()
    cy.findByText('Copy link').click()
    cy.get('@copy').should('be.calledWithExactly', link)
  })

  it('should goto link by click link block', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'open')
      }
    })
    const link = 'https://www.brickdoc.com'
    cy.get('[contenteditable]').type('/embed')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Embed anything').click()
    cy.findByPlaceholderText('Paste in https://...').focus().type(link)
    cy.findByText('Embed').click()
    cy.get('.brickdoc-link-block').click()
    cy.window().its('open').should('be.calledWithExactly', link, '_blank')
  })
})
