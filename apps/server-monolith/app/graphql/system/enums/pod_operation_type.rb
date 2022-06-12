# frozen_string_literal: true

module System
  module Enums
    class PodOperationType < BrickGraphQL::BaseEnum
      description 'Pod operation types'

      value 'CREATE', 'CREATE'
      value 'UPDATE', 'UPDATE'
    end
  end
end
