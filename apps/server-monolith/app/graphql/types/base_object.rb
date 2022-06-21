# frozen_string_literal: true

module Types
  class BaseObject < ::GraphQL::Schema::Object
    field_class Types::BaseField
    include GraphQL::FragmentCache::Object
    include Mashcard::GraphQL::PolicyBehaviour
    include Mashcard::GraphQL::CopyFieldDescription
    include Mashcard::GraphQL::HasPrimaryKey
  end
end
