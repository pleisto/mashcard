# frozen_string_literal: true

module Docs
  module Enums
    class Patchtype < BrickGraphQL::BaseEnum
      value 'ADD', 'ADD'
      value 'UPDATE', 'UPDATE'
      value 'DELETE', 'DELETE'
    end
  end
end
