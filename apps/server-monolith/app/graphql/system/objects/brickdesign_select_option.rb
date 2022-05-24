# frozen_string_literal: true

module System
  module Objects
    class BrickdesignSelectOption < BrickGraphQL::BaseObject
      graphql_name 'select_option'
      description 'Option Object for BrickDesign Select Component.'

      field :label, String, 'option label', null: false
      field :value, String, 'option value', null: false
    end
  end
end
