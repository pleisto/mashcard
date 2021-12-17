import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('imageBlock', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  const openImageBlockUploader = (): void => {
    cy.addBlock('image')
  }

  it('embeds image by insert link', () => {
    cy.visit('/')
    openImageBlockUploader()
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.input.id)
      .focus()
      .type(
        'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
      )
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.button.id).click()
    cy.findByTestId(TEST_ID_ENUM.editor.imageBlock.image.id).should('exist')
  })

  // TODO: failed on CI for no reason
  it.skip('embeds image by upload image file', () => {
    cy.visit('/')
    openImageBlockUploader()
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.tabs.Upload.id).click()
    cy.get('input[type=file]').attachFile('images/test.png')
    cy.findByTestId(TEST_ID_ENUM.editor.imageBlock.image.id).should('exist')
  })

  it('embeds image from Unsplash', () => {
    cy.visit('/')
    openImageBlockUploader()
    cy.findByText('Unsplash').click()
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.tabs.Unsplash.id).click()
    cy.get('.unsplash-image-item:first').click()
    cy.findByTestId(TEST_ID_ENUM.editor.imageBlock.image.id).should('exist')
  })

  it.skip('zooms in image when double click', () => {
    cy.visit('/')
    openImageBlockUploader()
    const imageUrl =
      'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.input.id).focus().type(imageUrl)
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.button.id).click()
    // cy.waitForResources(
    //   'https://images.unsplash.com/photo-1628189847457-b4607de7d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
    // )
    cy.findByTestId(TEST_ID_ENUM.editor.imageBlock.zoomInButton.id).dblclick()
    cy.get('[aria-modal="true"] > button').should('exist').click().should('not.exist')
  })

  it.skip('shows a correctly sized skeleton when loading', () => {
    cy.visit('/')

    const pageTitle = `Image ${Math.random().toString(36).substr(2, 5)}`
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).type(pageTitle)

    openImageBlockUploader()
    const imageUrl = 'https://deelay.me/800/https://picsum.photos/200/300'
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.input.id).focus().type(imageUrl)
    cy.interceptGQL('blockSyncBatch', ({ variables }) =>
      variables?.input.blocks.some(block => block.meta.image?.key === imageUrl && block.meta.image?.width === 200)
    )
    cy.findByTestId(TEST_ID_ENUM.uploader.Dashboard.modules.link.button.id).click()
    const skeletonSelector = '.brickdoc-block-image-section-container .brk-skeleton'
    cy.get(skeletonSelector).should('exist').invoke('width').should('eq', 700)
    cy.wait('@gql:blockSyncBatch').reload()

    cy.findAllByText(pageTitle).last().click()
    const imageSelector = '.brickdoc-block-image-section-container .image-section-control-panel'
    cy.get(imageSelector).invoke('width').should('eq', 200)
    cy.get(imageSelector).invoke('height').should('eq', 300)
  })
})
