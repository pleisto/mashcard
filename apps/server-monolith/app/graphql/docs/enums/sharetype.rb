# frozen_string_literal: true

module Docs
  module Enums
    class Sharetype < BrickGraphQL::BaseEnum
      value 'POD', 'POD'
      value 'USER', 'USER'
      value 'EVERYONE', 'EVERYONE'
      value 'ANONYMOUS', 'ANONYMOUS'
    end
  end
end
