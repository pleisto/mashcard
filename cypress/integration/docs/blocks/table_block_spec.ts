import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('tableBlock', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.addBlock('table')
  })

  describe('Basic', () => {
    it('creates a table block normally', () => {
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.id).should('exist')
    })

    it('adds new column nomrally', () => {
      cy.findByText('Column2').should('exist')
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.column.addButton.id).click()
      cy.findByText('Column3').should('exist')
    })

    it('updates column name normally', () => {
      cy.findByText('Column1').click()
      cy.findAllByDisplayValue('Column1').focus().type('NewColumn')
      cy.findByText('NewColumn').should('exist')
    })

    it('deletes column normally', () => {
      cy.findByText('Column1').click()
      cy.findByText('Delete').click()
      // confirm
      cy.get('.brk-modal-confirm-btns > button:first').click()
      cy.findByText('Column1').should('not.exist')
    })

    it('adds new row normally', () => {
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 3)
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id).click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 4)
    })
  })

  describe('Text Cell', () => {
    it('edits text cell normally', () => {
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
      cy.focused().type('text')
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })
      cy.get('.active').findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).should('contain.text', 'text')
    })

    it('closes text cell editing status by press enter', () => {
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
      cy.focused().type('text{Enter}')
      cy.get('.active').findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).should('contain.text', 'text')
    })
  })
})
