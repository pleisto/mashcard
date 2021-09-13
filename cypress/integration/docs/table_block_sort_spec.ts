describe('tableBlockSort', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })

    cy.visit('/')
    cy.get('[contenteditable]').type('/table')
    cy.get('button.slash-menu-item:first').click()

    // add new column
    cy.get('.table-block-th:last > button').click()
    cy.get('.table-toolbar-add-button').click()

    // change to select type
    cy.findByText('Column1').click()
    cy.findByText('Text').click()
    cy.findByText('Select').click()
    cy.get('.table-block-select-cell:last').click()
    // add new select option
    cy.focused().type('new option 2{Enter}')
    cy.focused().type('new option{Enter}')
    cy.findByTestId('table-select-overlay').click()
    // edit text cell
    cy.get('.table-block-text-cell:last').click()
    cy.focused().type('text')
    cy.findByTestId('table-text-overlay').click({ force: true })

    // add row 2
    cy.get('.table-block-tbody > .table-block-row:first').realHover()
    cy.get('.table-block-tbody > .table-block-row:first > .table-block-row-actions > button:first').click({ force: true })
    // edit text cell
    cy.get('.table-block-text-cell:last').click()
    cy.focused().type('text2')
    cy.findByTestId('table-text-overlay').click({ force: true })
    // pick select option
    cy.get('.table-block-select-cell:last').click()
    cy.findByText('new option 2').click()
    cy.findByTestId('table-select-overlay').click({ force: true })

    // add row 3
    cy.get('.table-block-tbody > .table-block-row:last').realHover()
    cy.get('.table-block-tbody > .table-block-row:last > .table-block-row-actions > button:first').click({ force: true })
    // edit text cell
    cy.get('.table-block-text-cell:last').click()
    cy.focused().type('text')
    cy.findByTestId('table-text-overlay').click({ force: true })
    // pick select option
    cy.get('.table-block-select-cell:last').click()
    cy.findAllByText('new option 2').last().click()
    cy.findByTestId('table-select-overlay').click({ force: true })
  })

  it('should remove sort option', () => {
    cy.findByText('Sort').click()
    cy.findByText('Add a Sort').click()

    cy.get('.table-toolbar-item-option').should('have.length', 1)

    cy.get('.table-toolbar-item-option > button').click()

    cy.get('.table-toolbar-item-option').should('have.length', 0)
  })

  it('should sort data by combining sort options', () => {
    cy.get('.table-block-tbody > .table-block-row').should('have.length', 3)

    cy.findByText('Sort').click()
    cy.findByText('Add a Sort').click()
    cy.get('.table-toolbar-item-option-select:first').click()
    cy.focused().type('{Enter}')

    cy.get('.table-toolbar-item-option-select:last').click()
    cy.focused().type('asc{Enter}')

    cy.findByText('Add a Sort').click()

    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:first').click()
    cy.focused().type('Column1{Enter}')
    cy.get('.table-toolbar-item-option:nth-of-type(2) > .table-toolbar-item-option-select:last').click()
    cy.focused().type('desc{Enter}')

    cy.get('.table-block-tbody > .table-block-row .table-block-text-cell:first').should('contain.text', 'text')
    cy.get('.table-block-tbody > .table-block-row .table-block-select-cell:first').should('contain.text', 'new option')

    cy.get('.table-block-tbody > .table-block-row:last .table-block-text-cell:first').should('contain.text', 'text2')
    cy.get('.table-block-tbody > .table-block-row:last .table-block-select-cell:first').should('contain.text', 'new option 2')
  })
})
