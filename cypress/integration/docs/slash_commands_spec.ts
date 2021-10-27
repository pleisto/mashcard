import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('slashCommands', () => {
  beforeEach(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
  })
  it('opens slash commands menu when typing slash char at start', () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('/')
    cy.findAllByTestId(TEST_ID_ENUM.editor.slashCommands.item.id).first().should('exist')
  })

  it('turns into h1 when select Heading 1 command', () => {
    cy.visit('/')
    cy.addBlock('h1')
    cy.focused().type('h1')
    cy.get('.ProseMirror > h1').should('contain.text', 'h1')
  })

  it(`won't open slash commands menu when typing slash char from the non-start position`, () => {
    cy.visit('/')
    cy.get('[contenteditable]').type('h1/')
    cy.findAllByTestId(TEST_ID_ENUM.editor.slashCommands.item.id).should('not.exist')
  })

  it('filters menu items by pressing arrow up/down', () => {
    cy.visit('/')
    cy.slashCommand('{downArrow}{upArrow}{enter}h1')
    cy.get('.ProseMirror > h1').should('contain.text', 'h1')
  })
})
