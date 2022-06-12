# frozen_string_literal: true

module BrickGraphQL
  module Concerns
    module HasPrimaryKey
      extend ActiveSupport::Concern

      class_methods do
        def has_primary_key(opts = {})
          opts = {
            uuid: false,
          }.merge(opts)
          type = opts[:uuid] ? BrickGraphQL::Scalars::UUID : BrickGraphQL::Scalars::AutoIncrementID
          field :id, type, 'object unique id', null: false
        end
      end
    end
  end
end
