# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    graphql_name 'subscription'

    field :document, subscription: Subscriptions::Document
    field :new_patch, subscription: Subscriptions::NewPatch
  end
end
