describe('bubbleMenu', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })
  it('should insert inline link', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('link')

    const link = 'https://www.brickdoc.com'

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get('[contenteditable]').type('{selectAll}')
    cy.findAllByRole('menuitem').last().click()
    cy.findByPlaceholderText('Paste link').type(link)
    cy.findByText('Link to URL').click()
    cy.get('[contenteditable] a').should('have.attr', 'href').and('equal', link)
  })

  it('should copy link', () => {
    cy.visit('/', {
      onBeforeLoad(win: Window): void {
        cy.spy(win.navigator.clipboard, 'writeText').as('copy')
      }
    })
    cy.get('[contenteditable]').type('link')

    const link = 'https://www.brickdoc.com'

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get('[contenteditable]').type('{selectAll}')
    cy.findAllByRole('menuitem').last().click()
    cy.findByPlaceholderText('Paste link').type(link)
    cy.findByText('Copy link').click()
    cy.get('@copy').should('be.calledWithExactly', link)
  })

  it('should visit link by click linked to button', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'open')
      }
    })
    cy.get('[contenteditable]').type('link')

    const link = 'https://www.brickdoc.com'

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get('[contenteditable]').type('{selectAll}')
    cy.findAllByRole('menuitem').last().click()
    cy.findByPlaceholderText('Paste link').type(link)
    cy.findByText('Link to URL').click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get('[contenteditable]').type('{selectAll}')
    cy.findAllByRole('menuitem').last().click()
    cy.findByText('Linked to').click()
    cy.window().its('open').should('be.calledWithExactly', link, '_blank')
  })
})
