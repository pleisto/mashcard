// CypressOnRails: dont remove these command
Cypress.Commands.add('appCommands', (body) => {
  cy.log(`APP: ${  JSON.stringify(body)}`)
  return cy.request({
    method: 'POST',
    url: "/__cypress__/command",
    body: JSON.stringify(body),
    log: true,
    failOnStatusCode: true
  }).then((response) => {
    return response.body
  })
})

// eslint-disable-next-line camelcase
Cypress.Commands.add('app', (name, commandOptions) => {
  return cy.appCommands({name, options: commandOptions}).then((body) => {
    return body[0]
  })
})

Cypress.Commands.add('appScenario', (name, options = {}) => {
  return cy.app(`scenarios/${  name}`, options)
})

Cypress.Commands.add('appEval', (code) => {
  return cy.app('eval', code)
})

Cypress.Commands.add('appFactories', (options) => {
  return cy.app('factory_bot', options)
})

Cypress.Commands.add('appFixtures', (options) => {
  cy.app('activerecord_fixtures', options)
})
// CypressOnRails: end

// The next is optional
// beforeEach(() => {
//  cy.app('clean') // have a look at cypress/app_commands/clean.rb
// });

// comment this out if you do not want to attempt to log additional info on test fail
Cypress.on('fail', (err, runnable) => {
  // allow app to generate additional logging data
  Cypress.$.ajax({
    url: '/__cypress__/command',
    data: JSON.stringify({name: 'log_fail', options: {error_message: err.message, runnable_full_title: runnable.fullTitle() }}),
    async: false,
    method: 'POST'
  })

  throw err
})
