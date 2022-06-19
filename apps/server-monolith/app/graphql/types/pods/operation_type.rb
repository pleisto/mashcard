# frozen_string_literal: true

module Types
  module Pods
    class OperationType < BaseEnum
      graphql_name 'PodOperation'
      description 'Pod operation types'

      value 'CREATE', 'CREATE'
      value 'UPDATE', 'UPDATE'
    end
  end
end
