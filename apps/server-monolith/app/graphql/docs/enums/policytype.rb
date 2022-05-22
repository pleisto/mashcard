# typed: strict
# frozen_string_literal: true

module Docs
  module Enums
    class Policytype < BrickGraphQL::BaseEnum
      value 'view', 'VIEW'
      value 'edit', 'EDIT'
    end
  end
end
