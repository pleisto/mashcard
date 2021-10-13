# frozen_string_literal: true
module Docs
  class Mutations::BlockPinOrUnpin < BrickGraphQL::BaseMutation
    argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :pin, Boolean, 'pin', required: true

    def resolve(block_id:, pin:)
      obj = Docs::Pin.find_or_create_by!(
        user_id: current_user.id, pod_id: current_pod.fetch('id'), block_id: block_id
      )
      obj.update!(deleted_at: pin ? nil : Time.current)

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
