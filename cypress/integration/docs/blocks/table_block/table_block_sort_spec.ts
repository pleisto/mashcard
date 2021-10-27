import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('tableBlockSort', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })

    cy.visit('/')
    cy.addBlock('table')

    // change to select type
    cy.findByText('Column1').click()
    cy.findByText('Text').click()
    cy.findByText('Select').click()
    // edit text cell
    cy.get('.table-block-row:nth-child(2)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
    cy.focused().type('text')
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })
    cy.get('.table-block-row:nth-child(2)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click({ force: true })
    // add new select option
    cy.focused().type('new option 2{Enter}')
    cy.get('.table-block-row:nth-child(2)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click({ force: true })
    cy.focused().type('new option{Enter}')

    // edit text cell
    cy.get('.table-block-row:nth-child(4)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
    cy.focused().type('text2')
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })
    // pick select option
    cy.get('.table-block-row:nth-child(4)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
    cy.findByText('new option 2').click()

    // add row 3
    // edit text cell
    cy.get('.table-block-row:nth-child(6)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
    cy.focused().type('text')
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })
    // pick select option
    cy.get('.table-block-row:nth-child(6)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
    cy.findAllByText('new option 2').last().click()
  })

  it('removes sort option normally', () => {
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.sortButton.id).click()
    cy.findByText('Add a Sort').click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.sort.option.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.sort.option.deleteButton.id).click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.sort.option.id).should('have.length', 0)
  })

  it('sorts data by combining sort options', () => {
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 3)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.sortButton.id).click()
    cy.findByText('Add a Sort').click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.sort.option.select.id).first().click()
    cy.focused().type('Column2{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.sort.option.select.id).last().click()
    cy.focused().type('asc{Enter}')

    cy.findByText('Add a Sort').click()

    cy.get('.table-toolbar-item-option:nth-of-type(2)')
      .findAllByTestId(TEST_ID_ENUM.editor.tableBlock.sort.option.select.id)
      .first()
      .click()
    cy.focused().type('Column1{Enter}')
    cy.get('.table-toolbar-item-option:nth-of-type(2)').findAllByTestId(TEST_ID_ENUM.editor.tableBlock.sort.option.select.id).last().click()
    cy.focused().type('desc{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).first().should('contain.text', 'text')
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).first().should('contain.text', 'new option')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().should('contain.text', 'text2')
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().should('contain.text', 'new option 2')
  })
})
