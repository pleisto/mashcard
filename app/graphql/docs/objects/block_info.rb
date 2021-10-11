# frozen_string_literal: true
module Docs
  module Objects
    class BlockInfo < BrickGraphQL::BaseObject
      field :is_deleted, Boolean, 'is deleted', null: false
      field :title, String, 'title', null: false
      field :permission, ShareLink, 'permission', null: true
    end
  end
end
