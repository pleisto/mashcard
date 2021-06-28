# frozen_string_literal: true
module Docs
  class Scalars::BlockMeta < BrickGraphQL::BaseScalar
    description "block meta"

    def self.coerce_input(value, _context)
      value
    end

    def self.coerce_result(value, _context)
      value
    end
  end
end
