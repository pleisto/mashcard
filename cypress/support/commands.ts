// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands'
import 'cypress-file-upload'
import 'cypress-real-events/support'

import { HttpResponseInterceptor, StaticResponse } from 'cypress/types/net-stubbing'

Cypress.Commands.add(
  'interceptGQL',
  (
    operationName: string,
    reqBodyMatcher?: (body: { operationName: string; query: string; variables: any }) => boolean,
    staticResponseOrResponseInterceptor?: StaticResponse | HttpResponseInterceptor
  ) => {
    cy.intercept('POST', '/.internal-apis/$graph', req => {
      const { body } = req
      if (
        Object.prototype.hasOwnProperty.call(body, 'operationName') &&
        body.operationName === operationName &&
        (reqBodyMatcher?.(body) ?? true)
      ) {
        req.alias = `gql:${operationName}`
        req.reply(staticResponseOrResponseInterceptor)
      }
    })
  }
)
