import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('document cover', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('adds document cover', () => {
    cy.visit('/')
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).focus()
    cy.focused().realHover()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.coverButton.id).realClick()
    cy.get('.unsplash-image-item:first').click()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.cover.id).should('have.css', 'background-image')
  })

  it('changes document cover normally', () => {
    cy.visit('/')
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).focus()
    cy.focused().realHover()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.coverButton.id).realClick()
    cy.get('.unsplash-image-item:first').click()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.changeCoverButton.id).realClick()
    cy.get('.unsplash-image-item:nth-of-type(2)').click()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.cover.id).should('have.css', 'background-image')
  })
})
