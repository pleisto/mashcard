# typed: strict
# frozen_string_literal: true

module System
  module Enums
    class SpaceOperationType < BrickGraphQL::BaseEnum
      description 'Space operation types'

      value 'CREATE', 'CREATE'
      value 'UPDATE', 'UPDATE'
    end
  end
end
