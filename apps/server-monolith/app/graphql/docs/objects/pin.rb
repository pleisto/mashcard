# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class Pin < BrickGraphQL::BaseObject
      graphql_name 'pin'
      description 'Brickdoc Docs::Pin'

      field :block_id, BrickGraphQL::Scalars::UUID, 'root uuid', null: false
      field :meta, BlockMeta, null: false
      field :text, String, 'text', null: false
    end
  end
end
