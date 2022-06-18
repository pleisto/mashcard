# frozen_string_literal: true

module Types
  class ValidateResult < Types::BaseObject
    graphql_name 'ValidateResult'
    field :message, String, 'error message', null: false
    field :success, Boolean, 'Validate success', null: false
  end
end
