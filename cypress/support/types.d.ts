import { HttpResponseInterceptor, StaticResponse } from 'cypress/types/net-stubbing'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mock user session
       * @example cy.sessionMock({ email: 'example@brickdoc.com', redirect_to: '/' })
       */
      sessionMock: (details: { email: string; redirect_to?: string }) => Chainable<Element>

      interceptGQL: (
        operationName: string,
        reqBodyMatcher: (body: { operationName: string; query: string; variables: any }) => boolean,
        staticResponseOrResponseInterceptor?: StaticResponse | HttpResponseInterceptor
      ) => Chainable<Element>

      addBlock: (blockName: string) => Chainable<Element>

      slashCommand: (command: string) => Chainable<Element>

      /**
       * Adds command "cy.waitForResources(name1, name2, ...)"
       * that checks performance entries for resources that end with the given names.
       * This command will be available in every spec file.
       *
       * @example cy.waitForResources('base.css', 'app.css')
       *
       * You can pass additional options, like "timeout"
       *
       * @example cy.waitForResources('base.css', 'app.css', { timeout: 3000 })
       *
       * For more detailed usage, see <https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__wait-for-resource/README.md>
       */
      waitForResources: (...args: [...string[], { timeout?: number } | string]) => Chainable<Element>
    }
  }
}
