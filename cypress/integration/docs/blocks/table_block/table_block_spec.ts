import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('tableBlock', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
    cy.visit('/')
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

  describe('Select Cell', () => {
    it("clears all row's value after delete options", () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()

      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).first().click({ force: true })
      cy.focused().type('new option{Enter}')
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click({ force: true })
      cy.focused().type('new option{Enter}')
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click({ force: true })
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.option.menuButton.id).click({ force: true })
      cy.findByText('Delete').click()
      cy.findAllByText('Delete').last().click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).first().click({ force: true })
      // after clearing value, there is no "Create option"
      cy.findByText('Create').should('not.exist')
    })
    it('changes cell type to select normally', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).should('exist')
    })

    it('creates new select option normally', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
      cy.focused().type('new option{Enter}')

      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.option.id).should('have.length', 1)
    })

    it('selects option normally', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()

      cy.focused().type('new option{Enter}')
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
      cy.focused().type('new option 2{Enter}')
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
      cy.findByText('new option').click()
      cy.get('.active').findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).should('contain.text', 'new option')
    })

    it('filters select option normally', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
      cy.focused().type('new option{Enter}')
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
      cy.focused().type('new option 2{Enter}')
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click()
      cy.focused().type('new option 2')
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.option.id).should('have.length', 1)
    })
  })

  describe('Date Cell', () => {
    it('edits date cell normally', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).last().click()
      cy.findByText('Today').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).should('exist')
    })

    it('makes date cell include time', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).last().click()
      cy.findByText('Include time').click()
      cy.findByText('Now').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).should('exist')
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id).click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).last().click()
      cy.get('input[type=checkbox]').should('be.checked')
    })

    it('clears content when change type from anything to date', () => {
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
      cy.focused().type('text')
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })
      cy.findByText('Column2').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).last().should('not.contain.text', 'text')
    })
  })

  describe('Date Range Cell', () => {
    it('edits date range cell normally', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date Range').click({ force: true })

      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.dateRange.id).last().click()
      cy.get('.brk-picker-cell-today').last().click()
      cy.get('.brk-picker-cell-today').last().click()
      cy.get('.brk-picker-cell-today').last().click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.dateRange.id).should('exist')
    })

    it('makes date range cell include time', () => {
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date Range').click({ force: true })
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.dateRange.id).last().click()
      cy.findByText('Include time').click()
      cy.get('.brk-picker-cell-today').click()
      cy.findByText('Ok').click()
      cy.get('.brk-picker-cell-today').click()
      cy.findByText('Ok').click()
      cy.findByText('Ok').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.dateRange.id).should('exist')
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id).click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.dateRange.id).last().click()
      cy.get('input[type=checkbox]').should('be.checked')
    })

    it('clears content when change type from anything to date range', () => {
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
      cy.focused().type('text')
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })
      cy.findByText('Column2').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date Range').click()
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.dateRange.id).last().should('not.contain.text', 'text')
    })
  })
})
