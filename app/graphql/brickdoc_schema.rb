# frozen_string_literal: true

class BrickdocSchema < BrickGraphQL::BaseSchema
  NAMESPACES = [
    # IAM,
    System,
  ]
  # use GraphQL::Subscriptions::ActionCableSubscriptions

  query RootQuery
  mutation RootMutation
  # subscriptions RootSubscription
end
