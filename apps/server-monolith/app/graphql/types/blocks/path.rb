# frozen_string_literal: true

module Types
  module Blocks
    class Path < Types::BaseObject
      graphql_name 'BlockPath'
      field :icon, Icon, 'icon', null: true
      field :id, Scalars::UUID, 'icon', null: false
      field :text, String, 'cover', null: false
    end
  end
end
