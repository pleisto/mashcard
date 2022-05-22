# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class BlockHistory < BrickGraphQL::BaseObject
      has_primary_key
      field :history_version, Int, 'History version', null: false
    end
  end
end
