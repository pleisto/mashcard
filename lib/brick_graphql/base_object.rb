# frozen_string_literal: true

module BrickGraphQL
  class BaseObject < ::GraphQL::Schema::Object
    # Mutation will also inherit from BaseObject, so please DO NOT write any query-only code here.
    field_class BaseField
  end
end
