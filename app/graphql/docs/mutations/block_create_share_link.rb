# frozen_string_literal: true
module Docs
  class Mutations::BlockCreateShareLink < BrickGraphQL::BaseMutation
    argument :id, BrickGraphQL::Scalars::UUID, 'block id', required: true
    argument :target, [Inputs::ShareLinkInput], 'share link target', required: true

    def resolve(id:, target:)
      block = Docs::Block.non_deleted.find(id)
      block.upsert_share_links!(target)

      nil
    rescue => e
      raise BrickGraphQL::Errors::ArgumentError, e.message
    end
  end
end
