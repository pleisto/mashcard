import { TEST_ID_ENUM } from '@brickdoc/test-helper'

describe('slashCommands', () => {
  before(() => {
    cy.sessionMock({ email: 'cypress@brickdoc.com' })
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
  })

  beforeEach(() => {
    cy.get('[contenteditable]').type('{backspace}{backspace}{backspace}')
  })

  it('opens slash commands menu when typing slash char at start', () => {
    cy.get('[contenteditable]').type('/')
    cy.findAllByTestId(TEST_ID_ENUM.editor.slashCommands.item.id).first().should('exist')
  })

  it('turns into h1 when select Heading 1 command', () => {
    cy.get('[contenteditable]').type('/h1{enter}')
    cy.focused().type('h1')
    cy.get('.ProseMirror .node-heading h1').should('contain.text', 'h1')
  })

  it(`won't open slash commands menu when typing slash char from the non-start position`, () => {
    cy.get('[contenteditable]').clear().type('h1/')
    cy.findAllByTestId(TEST_ID_ENUM.editor.slashCommands.item.id).should('not.exist')
  })

  it('filters menu items by pressing arrow up/down', () => {
    cy.get('[contenteditable]').slashCommand('h{downArrow}{downArrow}{upArrow}{enter}h2')
    cy.get('.ProseMirror .node-heading h2').should('contain.text', 'h2')
  })
})
