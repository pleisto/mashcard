# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class SpreadsheetChildren < BrickGraphQL::BaseObject
      field :blocks, [Docs::Objects::Block], 'blocks', null: true
    end
  end
end
