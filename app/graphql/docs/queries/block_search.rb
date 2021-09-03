# frozen_string_literal: true

module Docs
  class Queries::BlockSearch < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :webid, GraphQL::Types::String, required: true, description: 'webid'
    argument :input, GraphQL::Types::String, required: true, description: 'input'

    def resolve(webid:, input:)
      if input.blank?
        Docs::Block.joins(:pod).where(pod: { webid: webid }).pageable
      else
        Docs::Block.joins(:pod).where(pod: { webid: webid }).where("text like ?", "%#{input}%")
      end
    end
  end
end
