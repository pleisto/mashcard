# frozen_string_literal: true
module Docs
  module Objects
    class Block < Objects::BlockBaseObject
      graphql_name 'block'
      description 'Brickdoc Docs::Block'

      field :data, BlockData, null: false
      field :meta, BlockMeta, null: false
    end
  end
end
