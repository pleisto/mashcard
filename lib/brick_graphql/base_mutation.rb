# frozen_string_literal: true

module BrickGraphQL
  class BaseMutation < ::GraphQL::Schema::RelayClassicMutation
    object_class BaseObject
    field_class BaseField
    input_object_class BaseInputObject
    include Plugins::EntrypointValidatable
  end
end
