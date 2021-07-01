describe('slashCommands', ()=>{
  beforeEach(()=>{
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })
  it('should work when typing slash char at start',()=>{
    cy.visit('/')
    cy.get('[contenteditable]').type('/')
    cy.get('div[role=menuitem]').should('exist')
  })

  it('should work when select H1 command',()=>{
    cy.visit('/')
    cy.get('[contenteditable]').type('/')
    cy.get('div[role=menuitem]:first').click()
    cy.get('[contenteditable]').type('h1')
    cy.get('.ProseMirror > h1').should('contain.text', 'h1')
  })

  it('should not work when typing slash from the non-start position',()=>{
    cy.visit('/')
    cy.get('[contenteditable]').type('/')
    cy.get('div[role=menuitem]:first').click()
    cy.get('[contenteditable]').type('h1')
    cy.get('[contenteditable]').type('/')
    cy.get('div[role=menuitem]').should('not.exist')
  })

  it('should select item by pressing arrow up/down',()=>{
    cy.visit('/')
    cy.get('[contenteditable]').type('/').type('{downarrow}{enter}h2')
    cy.get('.ProseMirror > h2').should('contain.text', 'h2')
    // goto new line
    const emitter = cy.get('[contenteditable]').type('{enter}/')
    emitter.type('{downarrow}{uparrow}{enter}h1')
    cy.get('.ProseMirror > h1').should('contain.text', 'h1')
  })
})
