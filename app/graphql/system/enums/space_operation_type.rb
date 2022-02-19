# frozen_string_literal: true

module System
  class Enums::SpaceOperationType < BrickGraphQL::BaseEnum
    description 'Space operation types'

    value "CREATE", "CREATE"
    value "UPDATE", "UPDATE"
  end
end
