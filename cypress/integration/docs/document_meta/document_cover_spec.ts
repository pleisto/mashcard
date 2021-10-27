import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('document cover', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  it('adds document cover from gallery', () => {
    cy.visit('/')
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).focus()
    cy.focused().realHover()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.coverButton.id).realClick()
    cy.get('[style="background: rgb(95, 95, 95);"]').click()
    cy.get('[style="background-image: unset; background-color: rgb(95, 95, 95);"]').should('exist')
  })

  it('changes document cover normally', () => {
    cy.visit('/')
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.titleInput.id).focus()
    cy.focused().realHover()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.coverButton.id).realClick()
    cy.get('[style="background: rgb(95, 95, 95);"]').click()
    cy.findByTestId(TEST_ID_ENUM.page.DocumentPage.changeCoverButton.id).realClick()
    cy.get('[style="background: linear-gradient(rgb(251, 147, 147) 0%, rgb(210, 179, 67) 100%);"]').click()
    cy.get('[style="background-image: linear-gradient(rgb(251, 147, 147) 0%, rgb(210, 179, 67) 100%); background-color: unset;"]').should(
      'exist'
    )
    cy.get('[style="background: rgb(212, 55, 48);"]').click()
    cy.get('[style="background-image: unset; background-color: rgb(212, 55, 48);"]').should('exist')
  })
})
