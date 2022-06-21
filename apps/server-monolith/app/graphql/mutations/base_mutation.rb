# frozen_string_literal: true

module Mutations
  class BaseMutation < ::GraphQL::Schema::RelayClassicMutation
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    include Mashcard::GraphQL::PolicyBehaviour
    include Mashcard::GraphQL::CopyFieldDescription
    include Mashcard::GraphQL::HasPrimaryKey

    field :errors, [String],
      null: false,
      description: 'Errors encountered during execution of the mutation.',
      default_value: []

    def current_user
      context[:current_user]
    end

    def current_pod
      context[:current_pod]
    end

    # Returns Array of errors on an ActiveRecord object
    def errors_on_object(record)
      record.errors.full_messages
    end
  end
end
