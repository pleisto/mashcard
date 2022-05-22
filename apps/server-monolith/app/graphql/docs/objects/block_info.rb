# typed: strict
# frozen_string_literal: true

# rubocop:disable Naming/InclusiveLanguage
module Docs
  module Objects
    class BlockInfo < BrickGraphQL::BaseObject
      field :collaborators, [System::Objects::Space], 'space', null: false
      field :enabled_alias, BlockAlias, 'alias', null: true
      field :icon, BlockIcon, 'icon', null: true
      field :id, BrickGraphQL::Scalars::UUID, 'id', null: false
      field :is_deleted, Boolean, 'is deleted', null: false
      field :is_master, Boolean, 'is master', null: false
      field :path_array, [BlockPath], 'path', null: false
      field :permission, ShareLink, 'permission', null: true
      field :pin, Boolean, 'pin', null: false
      field :title, String, 'title', null: false
    end
  end
end
