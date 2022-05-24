# frozen_string_literal: true

module Docs
  module Enums
    class Sharetype < BrickGraphQL::BaseEnum
      value 'SPACE', 'SPACE'
      value 'USER', 'USER'
      value 'EVERYONE', 'EVERYONE'
      value 'ANONYMOUS', 'ANONYMOUS'
    end
  end
end
