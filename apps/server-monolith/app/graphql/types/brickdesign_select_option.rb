# frozen_string_literal: true

module Types
  class BrickdesignSelectOption < Types::BaseObject
    graphql_name 'SelectOption'
    description 'Option Object for BrickDesign Select Component.'

    field :label, String, 'option label', null: false
    field :value, String, 'option value', null: false
  end
end
