declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to mock user session
     * @example cy.sessionMock({ email: 'example@brickdoc.com', redirect_to: '/' })
     */
    sessionMock: (details: { email: string; redirect_to?: string }) => Chainable<Element>
  }
}
