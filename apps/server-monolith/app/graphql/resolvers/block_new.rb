# frozen_string_literal: true

module Resolvers
  class BlockNew < BaseResolver
    type Types::Blocks::New, null: true

    argument :history_id, GraphQL::Types::String, required: false, description: 'history id'
    argument :id, GraphQL::Types::String, required: true, description: 'block id'

    def resolve(id:, history_id: nil)
      block = Docs::Block.find_by(id: id)
      authorize! block, to: :show?

      current_user&.save_last_position!(block.pod.username, block.id) if block

      if history_id.present?
        block.cur_history_id = history_id
      end
      block
    end
  end
end
