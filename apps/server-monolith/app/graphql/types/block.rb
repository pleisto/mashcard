# frozen_string_literal: true

module Types
  class Block < Blocks::BaseObject
    graphql_name 'Block'
    description 'Brickdoc Docs::Block'

    field :content, [GraphQL::Types::JSON], 'content', null: false
    field :data, GraphQL::Types::JSON, null: false
    field :meta, Blocks::Meta, null: false
    field :text, String, 'text', null: false
  end
end
