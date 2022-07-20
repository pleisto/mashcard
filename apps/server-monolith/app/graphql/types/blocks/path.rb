# frozen_string_literal: true

module Types
  module Blocks
    class Path < Types::BaseObject
      graphql_name 'BlockPath'
      field :icon, Icon, 'icon', null: true
      field :id, Scalars::UUID, 'icon', null: false
      field :is_deleted, Boolean, 'is deleted', null: false
      field :title, String, 'title', null: false
    end
  end
end
