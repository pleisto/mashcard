import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('tableBlockFilter', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })

    cy.visit('/')
    cy.addBlock('table')

    const deleteEmptyRow = (): void => {
      cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().rightclick()
      cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.row.contextMenu.deleteButton.id).click()
      cy.get('.brk-modal-confirm-btns > .brk-btn:first').click()
    }

    // delete 3 empty rows
    deleteEmptyRow()
    deleteEmptyRow()
    deleteEmptyRow()

    // add tow new columns
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.column.addButton.id).click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.column.addButton.id).click()

    // change to select type
    cy.findByText('Column1').click()
    cy.findByText('Text').click()
    cy.findByText('Select').click({ force: true })

    // change to date type
    cy.findByText('Column2').click()
    cy.findAllByText('Text').last().click()
    cy.findByText('Date').click()

    // change to date range type
    cy.findByText('Column3').click()
    cy.findAllByText('Text').last().click()
    cy.findByText('Date Range').click()

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id).click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click({ force: true })
    // add new select option
    cy.focused().type('new option 2{Enter}')
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click({ force: true })
    cy.focused().type('new option{Enter}')
    // edit text cell
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click({ force: true })
    cy.focused().type('text')
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })

    // edit date cell
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).last().click({ force: true })
    // today
    cy.get('.brk-picker-cell-today').click()

    // edit date range cell
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.dateRange.id).last().click({ force: true })
    // today
    cy.get('.brk-picker-cell-today').last().click()
    cy.get('.brk-picker-cell-today').last().click()
    cy.get('.brk-picker-cell-today').last().click()

    // add row 2
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id).click()
    // edit text cell
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).last().click()
    cy.focused().type('text2')
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.overlay.id).click({ force: true })
    // pick select option
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).last().click({ force: true })
    cy.findByText('new option 2').click()
  })

  it('allows three level nested filter group', () => {
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.get('.table-toolbar-item-footer-button').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addGroupButton.id).click()
    cy.get('.table-toolbar-item-group-panel.cascade .table-toolbar-item-footer-button').click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addGroupButton.id).last().click()
    cy.get('.table-toolbar-item-group-panel.cascade .table-toolbar-item-group-panel .table-toolbar-item-footer-button').click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addGroupButton.id).last().click()
    cy.get(
      '.table-toolbar-item-group-panel.cascade .table-toolbar-item-group-panel .table-toolbar-item-group-panel .table-toolbar-item-footer-button'
    ).click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addGroupButton.id).should('not.exist')
    cy.findByText('Add a filter group').should('not.exist')
  })

  it('removes filter option normally', () => {
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.get('.table-toolbar-item-footer-button').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addButton.id).click()

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.id).should('have.length', 1)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.menuButton.id).click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.deleteButton.id).click()

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.id).should('have.length', 0)
  })

  it('duplicates filter option normally', () => {
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.get('.table-toolbar-item-footer-button').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addButton.id).click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.id).should('have.length', 1)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.menuButton.id).click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.duplicateButton.id).click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.id).should('have.length', 2)
  })

  it('filters data by combining filter options', () => {
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.findByText('Add a filter').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addButton.id).click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).first().click()
    cy.focused().type('Column4{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Is{Enter}')
    cy.findByPlaceholderText('Value').type('text2')

    cy.get('.filter-select-option').contains('Add a filter').click({ force: true })

    // And
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Column1{Enter}')
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(4)').click()
    cy.focused().type('new option 2{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).should('contain.text', 'text2')
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).should('contain.text', 'new option 2')

    // Or
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-head-select').click()
    cy.findByText('Or').click()
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.focused().type('Is not{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)
  })

  it('filters text data normally', () => {
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.findByText('Add a filter').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addButton.id).click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).first().click()
    cy.focused().type('Column4{Enter}')

    // Is
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Is{Enter}')
    cy.findByPlaceholderText('Value').type('text')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).should('contain.text', 'text')

    // Is not
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Is not{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).should('contain.text', 'text2')

    // Contains
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Contains{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)

    // Does not contain
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Does not contain{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    // Starts with
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Starts with{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)

    // Ends with
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Ends with{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.text.id).should('contain.text', 'text')

    // Is empty
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Is empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    // Is not empty
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).last().click()
    cy.focused().type('Is not empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)
  })

  it('filters select data normally', () => {
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.findByText('Add a filter').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addButton.id).click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).first().click()
    cy.focused().type('Column1{Enter}')

    // Is
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.focused().type('new option 2{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).should('contain.text', 'new option 2')

    // Is not
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.select.id).should('contain.text', 'new option')

    // Is empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    // Is not empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)
  })

  it('filters date data normally', () => {
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.findByText('Add a filter').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addButton.id).click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).first().click()
    cy.focused().type('Column2{Enter}')

    // Is
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is exact date
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Exact date').click()
    cy.findByPlaceholderText('Select date').click()
    cy.get('.brk-picker-cell-today').click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is not
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).should('not.have.text')

    // Is before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is before{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is on or before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or before{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is on or after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    // Is empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).should('not.have.text')

    // Is not empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
  })

  it('should filter date range data', () => {
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 2)

    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id).click()
    cy.findByText('Add a filter').click()
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.filter.addButton.id).click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.filter.option.select.id).first().click()
    cy.focused().type('Column3{Enter}')

    // Is
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click()

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is exact date
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Exact date').click()
    cy.findByPlaceholderText('Select date').click()
    cy.get('.brk-picker-cell-today').click()
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is not
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).should('not.have.text')

    // Is before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is before{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is on or before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or before{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    // Is on or after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 0)

    // Is empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
    cy.findByTestId(TEST_ID_ENUM.editor.tableBlock.cell.date.id).should('not.have.text')

    // Is not empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not empty{Enter}')

    cy.findAllByTestId(TEST_ID_ENUM.editor.tableBlock.row.id).should('have.length', 1)
  })
})
