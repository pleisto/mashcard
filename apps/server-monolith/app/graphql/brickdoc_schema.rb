# typed: true
# frozen_string_literal: true

class BrickdocSchema < BrickGraphQL::BaseSchema
  NAMESPACES = [
    Accounts,
    System,
    Docs,
  ]
  use GraphQL::Subscriptions::ActionCableSubscriptions

  tracer GraphQL::Tracing::ActiveSupportNotificationsTracing

  query RootQuery
  mutation RootMutation
  subscription RootSubscription
end
