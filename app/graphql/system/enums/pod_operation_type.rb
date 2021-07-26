# frozen_string_literal: true

module System
  class Enums::PodOperationType < BrickGraphQL::BaseEnum
    description 'Pod operation types'

    value "CREATE", "CREATE"
    value "UPDATE", "UPDATE"
  end
end
