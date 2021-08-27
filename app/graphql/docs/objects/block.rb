# frozen_string_literal: true
module Docs
  module Objects
    class Block < Objects::BlockBaseObject
      graphql_name 'block'
      description 'Brickdoc Docs::Block'

      field :content, [GraphQL::Types::JSON], 'content', null: false
      field :text, String, 'text', null: false
      field :data, GraphQL::Types::JSON, null: false
      field :meta, BlockMeta, null: false
    end
  end
end
