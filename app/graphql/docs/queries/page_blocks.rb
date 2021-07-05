# frozen_string_literal: true

module Docs
  class Queries::PageBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::PageBlock], null: true

    argument :webid, GraphQL::Types::String, required: true,
             description: 'List all pages for pod webid'

    def resolve(webid:)
      # TODO: permission check
      Docs::Block.joins(:pod).where(type: 'doc', pod: { webid: webid })
    end
  end
end
