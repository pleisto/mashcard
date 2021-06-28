# frozen_string_literal: true
module Docs
  class Scalars::BlockData < BrickGraphQL::BaseScalar
    description "block data"

    def self.coerce_input(value, _context)
      value
    end

    def self.coerce_result(value, _context)
      value
    end
  end
end
