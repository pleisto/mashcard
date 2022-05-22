# typed: strict
# frozen_string_literal: true

module System
  module Objects
    class ValidateResult < BrickGraphQL::BaseObject
      graphql_name 'validate_result'
      field :message, String, 'error message', null: false
      field :success, Boolean, 'Validate success', null: false
    end
  end
end
