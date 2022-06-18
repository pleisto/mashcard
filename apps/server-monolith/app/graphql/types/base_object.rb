# frozen_string_literal: true

module Types
  class BaseObject < ::GraphQL::Schema::Object
    field_class Types::BaseField
    include GraphQL::FragmentCache::Object
    include Brickdoc::GraphQL::PolicyBehaviour
    include Brickdoc::GraphQL::CopyFieldDescription
    include Brickdoc::GraphQL::HasPrimaryKey
  end
end
