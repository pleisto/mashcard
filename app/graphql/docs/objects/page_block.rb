# frozen_string_literal: true
module Docs
  class Objects::PageBlock < Objects::BlockBaseObject
    description "page blocks"

    def self.data_object
      create_object do
        graphql_name 'PageBlockData'
        field :title, String, 'page title', null: false
      end
    end

    def self.meta_object
      create_object do
        graphql_name 'PageBlockMeta'
        field :icon, String, 'page icon', null: true
        field :cover, BrickGraphQL::Scalars::HttpUrl, 'cover image', null: true
      end
    end

    field :data, data_object, null: false
    field :meta, meta_object, null: false
  end
end
