# frozen_string_literal: true

module Docs
  class Queries::Blocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :webid, GraphQL::Types::String, required: false,
             description: 'List all blocks from webid'
    argument :parent_id, GraphQL::Types::String, required: false,
             description: 'List all children from parent id'

    def resolve(webid:, parent_id:)
      condition = parent_id.present? ?
                    { parent_id: parent_id } : { pod_id: Pod.find_by_webid(webid).id, parent_id: nil }
      Docs::Block.where(condition)
    end
  end
end
