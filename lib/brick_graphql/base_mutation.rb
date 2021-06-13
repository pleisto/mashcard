# frozen_string_literal: true

module BrickGraphQL
  class BaseMutation < ::GraphQL::Schema::RelayClassicMutation
    object_class BaseObject
    field_class BaseField
    input_object_class BaseInputObject
    prepend Plugins::CopyFieldDescription
    include Plugins::EntrypointValidatable

    field :errors, [String],
          null: false,
          description: 'Errors encountered during execution of the mutation.'

    def current_user
      context[:current_user]
    end

    # Returns Array of errors on an ActiveRecord object
    def errors_on_object(record)
      record.errors.full_messages
    end
  end
end
