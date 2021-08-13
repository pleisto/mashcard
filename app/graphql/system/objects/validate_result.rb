# frozen_string_literal: true
module System
  module Objects
    class ValidateResult < BrickGraphQL::BaseObject
      graphql_name 'validate_result'
      field :success, Boolean, 'Validate success', null: false
      field :message, String, 'error message', null: false
    end
  end
end
