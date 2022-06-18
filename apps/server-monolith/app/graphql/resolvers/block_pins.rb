# frozen_string_literal: true

module Resolvers
  class BlockPins < BaseResolver
    description 'return all pins'
    type [Types::Pin], null: true

    def resolve
      return [] if current_user.nil?

      Docs::Pin.joins(:block).where(
        pod_id: current_pod.fetch('id'), deleted_at: nil, user_id: current_user.id
      ).where(docs_blocks: { deleted_at: nil, deleted_permanently_at: nil }).includes(:block)
    end
  end
end
