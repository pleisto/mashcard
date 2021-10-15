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
    cy.get('input[type=file]').attachFile('images/test.png')
    cy.get('.brickdoc-block-image').should('exist')
  })

  it('should select image from Unsplash', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/image')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Add an image').click()
    cy.findByText('Unsplash').click()
    cy.get('.unsplash-image-item:first').click()
    cy.get('.brickdoc-block-image').should('exist')
  })

  it('should zoom in image when double click', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/image')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Add an image').click()
    const imageUrl =
      'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
    cy.findByPlaceholderText('Paste the image link...').focus().type(imageUrl)
    cy.findByText('Embed image').click()
    cy.waitForResources(
      'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
    )
    cy.get('.image-section-zoom-in-button').dblclick()
    cy.get('[aria-modal="true"] > button').should('exist').click().should('not.exist')
  })

  it('should show a correctly sized skeleton when loading', () => {
    cy.visit('/')

    const pageTitle = `Image ${Math.random().toString(36).substr(2, 5)}`
    cy.findAllByPlaceholderText('Untitled').type(pageTitle)

    cy.get('[contenteditable]').type('/image')
    cy.get('button.slash-menu-item:first').click()
    cy.findByText('Add an image').click()
    const imageUrl = 'https://deelay.me/800/https://picsum.photos/200/300'
    cy.findByPlaceholderText('Paste the image link...').focus().type(imageUrl)
    cy.interceptGQL('blockSyncBatch', ({ variables }) =>
      variables?.input.blocks.some(block => block.meta.image?.key === imageUrl && block.meta.image?.width === 200)
    )
    cy.findByText('Embed image').click()
    const skeletonSelector = '.brickdoc-block-image-section-container .brk-skeleton'
    cy.get(skeletonSelector).should('exist').invoke('width').should('eq', 700)
    cy.wait('@gql:blockSyncBatch').reload()

    cy.findByText(pageTitle).click()
    const imageSelector = '.brickdoc-block-image-section-container .image-section-control-panel'
    cy.get(imageSelector).invoke('width').should('eq', 200)
    cy.get(imageSelector).invoke('height').should('eq', 300)
  })
})
