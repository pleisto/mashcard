# frozen_string_literal: true
module Docs
  module Objects
    class BlockMeta < BrickGraphQL::BaseObject
      field :icon, BlockIcon, 'icon', null: true
      field :cover, BlockCover, 'cover', null: true
    end
  end
end
