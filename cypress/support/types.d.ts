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
    }
  }
}
