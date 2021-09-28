# frozen_string_literal: true
module Docs
  class Mutations::BlockUpdate < BrickGraphQL::BaseMutation
    argument :block, Inputs::BlockInput, required: true
    argument :root_id, BrickGraphQL::Scalars::UUID, 'block root id', required: true

    def resolve(block:, root_id:)
      Rails.logger.info("resolve #{block.id} root_id: #{root_id}")
      do_resolve(block: block, root_id: root_id)
    end

    def do_resolve(block:, root_id:)
      # TODO: validating parent block, but what if parent block is not have been synced yet?
      # parent_block = Docs::Block.non_deleted.find(block.parent_id)
      update_block = Docs::Block.non_deleted.where(id: block.id).first_or_initialize

      update_block.text = block.text
      update_block.content = block.content
      update_block.sort = block.sort.to_i
      update_block.data = block.data
      update_block.meta = block.meta || {}
      update_block.parent_id = block.parent_id
      update_block.type = block.type
      update_block.pod_id ||= current_pod.fetch('id')
      update_block.root_id = root_id

      update_block.attachments = block.attachments if block.attachments

      update_block.deleted_at = nil

      update_block.collaborators << current_user.id if current_pod.fetch('owner_id') == current_user.id

      update_block.save!

      nil
    end
  end
end
