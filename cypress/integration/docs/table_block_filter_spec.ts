describe('tableBlockFilter', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })

    cy.visit('/')
    cy.get('[contenteditable]').type('/table')
    cy.get('button.slash-menu-item:first').click()

    // delete 3 empty rows
    cy.get('.table-block-text-cell:last').rightclick()
    cy.findByText('Delete').click()
    cy.get('.brk-modal-confirm-btns > .brk-btn:first').click()
    cy.get('.table-block-text-cell:last').rightclick()
    cy.findByText('Delete').click()
    cy.get('.brk-modal-confirm-btns > .brk-btn:first').click()
    cy.get('.table-block-text-cell:last').rightclick()
    cy.findByText('Delete').click()
    cy.get('.brk-modal-confirm-btns > .brk-btn:first').click()

    // add select column
    // with default 2 columns, no need to add more
    // cy.get('.table-block-th:last > button').click()
    // change to select type
    cy.findByText('Column1').click()
    cy.findByText('Text').click()
    cy.findByText('Select').click({ force: true })

    // add date column
    cy.get('.table-block-th:last > button').click()
    // change to date type
    cy.findByText('Column2').click()
    cy.findAllByText('Text').last().click()
    cy.findByText('Date').click()

    // add date range column
    cy.get('.table-block-th:last > button').click()
    // change to date range type
    cy.findByText('Column3').click()
    cy.findAllByText('Text').last().click()
    cy.findByText('Date Range').click()

    cy.get('.table-toolbar-add-button').click()

    cy.get('.table-block-select-cell:last').click({ force: true })
    // add new select option
    cy.focused().type('new option 2{Enter}')
    cy.focused().type('new option{Enter}')
    cy.findByTestId('table-select-overlay').click({ force: true })
    // edit text cell
    cy.get('.table-block-text-cell:last').click()
    cy.focused().type('text')
    cy.findByTestId('table-text-overlay').click({ force: true })

    // edit date cell
    cy.get('.table-block-date-cell:last').click({ force: true })
    // today
    cy.get('.brk-picker-cell-today').click()

    // edit date range cell
    cy.get('.table-block-date-range-cell:last').click({ force: true })
    // today
    cy.get('.brk-picker-cell-today').last().click()
    cy.get('.brk-picker-cell-today').last().click()
    cy.get('.brk-picker-cell-today').last().click()

    // add row 2
    cy.get('.table-toolbar-add-button').click()
    // edit text cell
    cy.get('.table-block-text-cell:last').click()
    cy.focused().type('text2')
    cy.findByTestId('table-text-overlay').click({ force: true })
    // pick select option
    cy.get('.table-block-select-cell:last').click({ force: true })
    cy.findByText('new option 2').click()
    cy.findByTestId('table-select-overlay').click({ force: true })
  })

  it('should allow three level nested filter group', () => {
    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.findByText('Add a filter group').click()
    cy.get('.table-toolbar-item-group-panel.cascade .table-toolbar-item-footer-button').click()
    cy.findAllByText('Add a filter group').click({ multiple: true, force: true })
    cy.get('.table-toolbar-item-group-panel.cascade .table-toolbar-item-group-panel .table-toolbar-item-footer-button').click()
    cy.findAllByText('Add a filter group').click({ multiple: true, force: true })
    cy.get(
      '.table-toolbar-item-group-panel.cascade .table-toolbar-item-group-panel .table-toolbar-item-group-panel .table-toolbar-item-footer-button'
    ).click()
    cy.findByText('Add a filter group').should('not.exist')
  })

  it('should remove filter option', () => {
    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()

    cy.get('.table-toolbar-item-option').should('have.length', 1)

    cy.get('.table-toolbar-item-option > button').click()
    cy.findByText('Remove').click()

    cy.get('.table-toolbar-item-option').should('have.length', 0)
  })

  it('should duplicate filter option', () => {
    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()

    cy.get('.table-toolbar-item-option').should('have.length', 1)

    cy.get('.table-toolbar-item-option > button').click()
    cy.findByText('Duplicate').click()

    cy.get('.table-toolbar-item-option').should('have.length', 2)
  })

  it('should filter data by combining filter options', () => {
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)

    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()
    cy.get('.table-toolbar-item-option-select:first').click()
    cy.focused().type('Column4{Enter}')

    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Is{Enter}')
    cy.findByPlaceholderText('Value').type('text2')

    cy.get('.table-toolbar-item-footer-button').contains('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()

    // And
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Column1{Enter}')
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(4)').click()
    cy.focused().type('new option 2{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-text-cell').should('contain.text', 'text2')
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-select-cell').should('contain.text', 'new option 2')

    // Or
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-head-select').click()
    cy.findByText('Or').click()
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.focused().type('Is not{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)
  })

  it('should filter text data', () => {
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)

    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()
    cy.get('.table-toolbar-item-option-select:first').click()
    cy.focused().type('Column4{Enter}')

    // Is
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Is{Enter}')
    cy.findByPlaceholderText('Value').type('text')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-text-cell').should('contain.text', 'text')

    // Is not
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Is not{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-text-cell').should('contain.text', 'text2')

    // Contains
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Contains{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)

    // Does not contain
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Does not contain{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    // Starts with
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Starts with{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)

    // Ends with
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Ends with{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-text-cell').should('contain.text', 'text')

    // Is empty
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Is empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    // Is not empty
    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('Is not empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)
  })

  it('should filter select data', () => {
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)

    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()
    cy.get('.table-toolbar-item-option-select:first').click()
    cy.focused().type('Column1{Enter}')

    // Is
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.focused().type('new option 2{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-select-cell').should('contain.text', 'new option 2')

    // Is not
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-select-cell').should('contain.text', 'new option')

    // Is empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    // Is not empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)
  })

  it('should filter date data', () => {
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)

    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()
    cy.get('.table-toolbar-item-option-select:first').click()
    cy.focused().type('Column2{Enter}')

    // Is
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click()

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is exact date
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Exact date').click()
    cy.findByPlaceholderText('Select date').click()
    cy.get('.brk-picker-cell-today').click()
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is not
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-date-cell').should('not.have.text')

    // Is before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is before{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is on or before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or before{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is on or after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    // Is empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-date-cell').should('not.have.text')

    // Is not empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
  })

  it('should filter date range data', () => {
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 2)

    cy.findByText('Filter').click()
    cy.findByText('Add a filter').click()
    cy.get('.filter-select-option').contains('Add a filter').click()
    cy.get('.table-toolbar-item-option-select:first').click()
    cy.focused().type('Column3{Enter}')

    // Is
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is{Enter}')
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click()

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is exact date
    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Exact date').click()
    cy.findByPlaceholderText('Select date').click()
    cy.get('.brk-picker-cell-today').click()
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is not
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-date-cell').should('not.have.text')

    // Is before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is before{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is on or before
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or before{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    // Is on or after
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is on or after{Enter}')

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Today').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Yesterday').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)

    cy.get('.table-toolbar-item-option-select:nth-of-type(3)').click()
    cy.findByText('Tomorrow').click({ force: true })
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 0)

    // Is empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
    cy.get('.table-block-tbody > .table-block-row > .table-block-tr .table-block-date-cell').should('not.have.text')

    // Is not empty
    cy.get('.table-toolbar-item-option-select:nth-of-type(2)').click()
    cy.focused().type('Is not empty{Enter}')

    cy.get('.table-block-tbody > .table-block-row > .table-block-tr').should('have.length', 1)
  })
})
