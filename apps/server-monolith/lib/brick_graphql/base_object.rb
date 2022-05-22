# typed: strict
# frozen_string_literal: true

module BrickGraphQL
  class BaseObject < ::GraphQL::Schema::Object
    # Mutation will also inherit from BaseObject, so please DO NOT write any query-only code here.
    field_class BaseField
    include GraphQL::FragmentCache::Object
    include BrickGraphQL::Concerns::PolicyBehaviour
    include BrickGraphQL::Concerns::CopyFieldDescription
    include BrickGraphQL::Concerns::HasPrimaryKey
  end
end
