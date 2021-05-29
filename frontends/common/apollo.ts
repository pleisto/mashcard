import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import * as ActionCable from '@rails/actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

const securityLink = setContext((_, { headers } )=>{
  return {
    headers: {
      ...headers,
      // Add Rails CSRF Token to httpLink
      'X-CSRF-Token': 'todo'
    }
  }
})

const httpLink = securityLink.concat(createHttpLink({
  uri: globalThis.brickdocContext?.internalApiEndpoint,
  credentials: 'same-origin'
}))

export const cable = ActionCable.createConsumer()

const websocketLink = new ActionCableLink({ cable, channelName: 'InternalGraphQLChannel' })

// If subscription operation or operation name end with 'FromWS' use WebSocket else use HTTP.
const brickdocLink = split(({ query, operationName })=> {
  const definition = getMainDefinition(query)
  return (
    (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
    || operationName.endsWith('FromWS')
  )
}, websocketLink, httpLink)

export const client = new ApolloClient({
  link: brickdocLink ,
  cache: new InMemoryCache()
})
