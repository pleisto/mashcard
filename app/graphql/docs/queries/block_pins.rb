# frozen_string_literal: true

module Docs
  class Queries::BlockPins < BrickGraphQL::BaseResolver
    description 'return all pins'
    type [Docs::Objects::Pin], null: true

    def resolve
      return [] if current_user.nil?
      Docs::Pin.joins(:block).where(
        space_id: current_space.fetch('id'), deleted_at: nil, user_id: current_user.id
      ).where(docs_blocks: { deleted_at: nil, deleted_permanently_at: nil }).includes(:block)
    end
  end
end
