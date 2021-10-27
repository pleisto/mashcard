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
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import '@testing-library/cypress/add-commands'
import 'cypress-file-upload'
import 'cypress-real-events/support'
import 'cypress-wait-until'

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

Cypress.Commands.add('slashCommand', (command: string) => {
  cy.get('[contenteditable]').type(`/${command}`)
})

Cypress.Commands.add('addBlock', (blockName: string) => {
  cy.get('[contenteditable]').type(`/${blockName}`)
  cy.findByTestId(TEST_ID_ENUM.editor.slashCommands.item.id).click()
})

Cypress.Commands.add('waitForResources', (...args) => {
  if (Cypress.browser.family === 'firefox') {
    cy.log('Skip waitForResource in Firefox')

    return
  }

  let names: string[]
  let options: { timeout?: number }

  const { isPlainObject, last } = Cypress._

  if (isPlainObject(last(args))) {
    names = args.slice(0, args.length - 1)
    options = last(args)
  } else {
    names = args
    options = {}
  }

  const log = false // let's not log inner commands
  const timeout = options.timeout || Cypress.config('defaultCommandTimeout')

  cy.log(`Waiting for resources ${names.join(', ')}`)

  cy.window({ log }).then(
    // note that ".then" method has options first, callback second
    // https://on.cypress.io/then
    { timeout },
    win => {
      return new Cypress.Promise((resolve, reject) => {
        // flag set when we find all names
        let foundResources

        // control how long we should try finding the resource
        // and if it is still not found. An explicit "reject"
        // allows us to show nice informative message
        setTimeout(() => {
          if (foundResources) {
            // nothing needs to be done, successfully found the resource
            return
          }

          clearInterval(interval)
          reject(new Error(`Timed out waiting for resources ${names.join(', ')}`))
        }, timeout)

        const interval = setInterval(() => {
          // eslint-disable-next-line max-nested-callbacks
          foundResources = names.every(name => {
            // eslint-disable-next-line max-nested-callbacks
            return win.performance.getEntriesByType('resource').find(item => item.name.endsWith(name))
          })

          if (!foundResources) {
            // some resource not found, will try again
            return
          }

          cy.log('Found all resources')
          clearInterval(interval)
          resolve()
        }, 100)
      })
    }
  )
})
