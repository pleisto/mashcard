# frozen_string_literal: true

module Subscriptions
  class BaseSubscription < ::GraphQL::Schema::Subscription
    object_class Types::BaseObject
    field_class Types::BaseField
  end
end
