describe('imageSection', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('should embed image by inputting link', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/image')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Add an image').click()
    cy.findByPlaceholderText('Paste the image link...')
      .focus()
      .type(
        'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
      )
    cy.findByText('Embed image').click()
    cy.get('.brickdoc-block-image').should('exist')
  })

  it('should upload image', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/image')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Add an image').click()
    cy.findByText('Upload').click()
    // avoid block unsaved, we need wait for 3s
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000)
    cy.get('input[type=file]').attachFile('images/test.png')
    cy.get('.brickdoc-block-image').should('exist')
  })

  // FIXME: ignore it for now because Unsplash API is too slow
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should select image from Unsplash', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/image')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Add an image').click()
    cy.findByText('Unsplash').click()
    cy.get('.unsplash-image-item:first').click()
    cy.get('.brickdoc-block-image').should('exist')
  })

  it('should zoom out image when double click', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/image')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Add an image').click()
    cy.findByPlaceholderText('Paste the image link...')
      .focus()
      .type(
        'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
      )
    cy.findByText('Embed image').click()
    cy.get('.brickdoc-block-image-section-container').dblclick()
    cy.get('[aria-modal="true"] > button').should('exist')
  })
})
