# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    graphql_name 'subscription'

    field :awareness, subscription: Subscriptions::Awareness
    field :document, subscription: Subscriptions::Document
  end
end
