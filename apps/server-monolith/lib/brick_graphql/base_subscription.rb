# frozen_string_literal: true

module BrickGraphQL
  class BaseSubscription < ::GraphQL::Schema::Subscription
    object_class BaseObject
    field_class BaseField
    argument_class BaseArgument
  end
end
