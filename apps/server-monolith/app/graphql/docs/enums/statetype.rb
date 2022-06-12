# frozen_string_literal: true

module Docs
  module Enums
    class Statetype < BrickGraphQL::BaseEnum
      value 'update', 'update'
      value 'full', 'full'
    end
  end
end
