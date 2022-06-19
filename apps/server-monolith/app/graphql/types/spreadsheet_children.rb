# frozen_string_literal: true

module Types
  class SpreadsheetChildren < Types::BaseObject
    field :blocks, [Types::Block], 'blocks', null: true
  end
end
