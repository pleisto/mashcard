# frozen_string_literal: true

module Docs
  class Queries::BlockPins < BrickGraphQL::BaseResolver
    description 'return all pins'
    type [Docs::Objects::Pin], null: true

    def resolve
      return [] if current_user.nil?
      Docs::Pin.where(pod_id: current_pod.fetch('id'), deleted_at: nil, user_id: current_user.id).includes(:block)
    end
  end
end
