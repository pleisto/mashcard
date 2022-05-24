# frozen_string_literal: true

module BrickGraphQL
  module Concerns
    module CopyFieldDescription
      extend ActiveSupport::Concern

      class_methods do
        # Returns the `description` for property of field `field_name` on type.
        # This can be used to ensure, for example, that mutation argument descriptions
        # are always identical to the corresponding query field descriptions.
        #
        # E.g.:
        #   argument :name, GraphQL::STRING_TYPE, description: description_same(Types::UserType, :name)
        def description_same(type, field_name = nil)
          field_name.present? ? type.fields[GraphQL::Schema::Member::BuildType.camelize(field_name.to_s)].description : type.description
        end
      end
    end
  end
end
