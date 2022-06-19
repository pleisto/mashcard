# frozen_string_literal: true

module Types
  class Pin < Types::BaseObject
    graphql_name 'Pin'
    description 'Brickdoc Docs::Pin'

    field :block_id, Scalars::UUID, 'root uuid', null: false
    field :meta, Blocks::Meta, null: false
    field :text, String, 'text', null: false
  end
end
