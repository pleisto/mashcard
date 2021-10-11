# frozen_string_literal: true
module Docs
  class Mutations::BlockCreate < BrickGraphQL::BaseMutation
    argument :parent_id, BrickGraphQL::Scalars::UUID, 'parent id', required: false
    argument :title, String, 'title', required: true

    field :id, BrickGraphQL::Scalars::UUID, null: false

    def resolve(args)
      if args[:parent_id]
        block = Docs::Block.non_deleted.find(args[:parent_id])
        result = block.create_sub_block!(args[:title])
      else
        pod_id = current_pod.fetch('id')
        max_sort = Docs::Block.non_deleted.where(pod_id: pod_id, type: 'doc', page: true, parent_id: nil).maximum(:sort) || 0
        result = Docs::Block.create!(
          data: {},
          content: [],
          text: args[:title],
          id: SecureRandom.uuid,
          parent_id: nil,
          page: true,
          sort: max_sort + Docs::Block::SORT_GAP,
          type: 'doc',
          meta: { title: args[:title] },
          pod_id: pod_id,
          collaborators: [current_user.id],
        )
      end

      { id: result.id }
    end
  end
end
