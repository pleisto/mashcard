describe('tableBlock', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })

  describe('Basic', () => {
    it('should create a table block', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.brickdoc-table-block').should('exist')
    })

    it('should add new column', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').should('exist')

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column2').should('exist')
    })

    it('should update column name', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findAllByDisplayValue('Column1').focus().type('NewColumn')
      cy.findByText('NewColumn').should('exist')
    })

    it('should delete column', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()

      cy.get('.table-block-th:last-child > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Delete').click()
      // confirm
      cy.get('.brk-modal-confirm-btns > .brk-btn:first').click()
      cy.findByText('Column1').should('not.exist')
    })

    it('should add new row', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-toolbar-add-button').click()
      cy.get('.table-block-row.active').should('exist')
    })
  })

  describe('Text Cell', () => {
    it('should edit text cell', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-text-cell:last').click()
      cy.focused().type('text')
      cy.findByTestId('table-text-overlay').click({ force: true })
      cy.get('.active > .table-block-text-cell').should('exist').should('contain.text', 'text')
    })

    it('should end text cell editing status by press enter', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-text-cell:last').click()
      cy.focused().type('text{Enter}')
      cy.get('.active > .table-block-text-cell').should('exist').should('contain.text', 'text')
    })
  })

  describe('Select Cell', () => {
    it('should change cell type to select', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.get('.table-block-select-cell:last').click()
      cy.get('.table-block-select').should('exist')
    })

    it('should create new select option', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.get('.table-block-select-cell:last').click()
      cy.focused().type('new option{Enter}')

      cy.get('.select-cell-option-item').should('have.length', 1)
    })

    it('should select option', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.get('.table-block-select-cell:last').click()

      cy.focused().type('new option{Enter}')
      cy.focused().type('new option 2{Enter}')
      cy.findByText('new option').click()
      cy.findByTestId('table-select-overlay').click({ force: true })
      cy.get('.active > .table-block-select-cell').should('exist').should('contain.text', 'new option')
    })

    it('should filter select option', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Select').click()
      cy.get('.table-block-select-cell:last').click()
      cy.focused().type('new option{Enter}')
      cy.focused().type('new option 2{Enter}')
      cy.focused().type('new option 2')
      cy.get('.select-cell-option-item').should('have.length', 1)
    })
  })

  describe('Date Cell', () => {
    it('should edit date cell', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date').click()
      cy.get('.table-block-date-cell:last').click()
      cy.findByText('Today').click()
      cy.get('.table-block-date-cell').should('exist')
    })

    it('should make date cell include time', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date').click()
      cy.get('.table-block-date-cell:last').click()
      cy.findByText('Include time').click()
      cy.findByText('Now').click()
      cy.get('.table-block-date-cell').should('exist')
      cy.get('.table-toolbar-add-button').click()
      cy.get('.table-block-date-cell:last').click()
      cy.get('input[type=checkbox]').should('be.checked')
    })
  })

  describe('Date Range Cell', () => {
    it('should edit date range cell', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date range').click({ force: true })
      cy.get('.table-block-date-range-cell:last').click()
      cy.get('.brk-picker-cell-today').last().click()
      cy.get('.brk-picker-cell-today').last().click()
      cy.get('.brk-picker-cell-today').last().click()
      cy.get('.table-block-date-range-cell').should('exist')
    })

    it('should make date cell include time', () => {
      cy.visit('/')
      cy.get('[contenteditable]').type('/table')
      cy.get('button.slash-menu-item:first').click()
      cy.get('.table-toolbar-add-button').click()

      cy.get('.table-block-th:last > button').click()
      cy.findByText('Column1').click()
      cy.findByText('Text').trigger('mouseover')
      cy.findByText('Date range').click({ force: true })
      cy.get('.table-block-date-range-cell:last').click()
      cy.findByText('Include time').click()
      cy.get('.brk-picker-cell-today').click()
      cy.findByText('Ok').click()
      cy.get('.brk-picker-cell-today').click()
      cy.findByText('Ok').click()
      cy.findByText('Ok').click()
      cy.get('.table-block-date-range-cell').should('exist')
      cy.get('.table-toolbar-add-button').click()
      cy.get('.table-block-date-range-cell:last').click()
      cy.get('input[type=checkbox]').should('be.checked')
    })
  })
})
