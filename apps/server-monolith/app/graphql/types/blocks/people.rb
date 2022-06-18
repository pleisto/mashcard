# frozen_string_literal: true

module Types
  module Blocks
    class People < Attachment
      graphql_name 'BlockPeople'
      field :avatar_url, String, 'avatar', null: true
      field :domain, String, 'key', null: false
      field :name, String, 'name', null: true
      field :type, BlockType, 'type', null: true
    end
  end
end
