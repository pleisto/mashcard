# frozen_string_literal: true

# rubocop:disable Naming/InclusiveLanguage
module Types
  module Blocks
    class Info < Types::BaseObject
      graphql_name 'BlockInfo'
      field :collaborators, [Types::Pod], 'pod', null: false
      field :enabled_alias, Alias, 'alias', null: true
      field :icon, Icon, 'icon', null: true
      field :id, Scalars::UUID, 'id', null: false
      field :is_deleted, Boolean, 'is deleted', null: false
      field :is_master, Boolean, 'is master', null: false
      field :path_array, [Path], 'path', null: false
      field :permission, ShareLink, 'permission', null: true
      field :pin, Boolean, 'pin', null: false
      field :title, String, 'title', null: false
    end
  end
end
