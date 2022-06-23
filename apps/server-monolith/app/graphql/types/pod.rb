# frozen_string_literal: true

module Types
  class Pod < ::GraphQL::Schema::Union
    graphql_name 'Pod'
    description 'MashCard Pod.'

    possible_types User, Group

    def self.resolve_type(object, _ctx)
      type_class_name = object['type'].downcase.classify
      "Types::#{type_class_name}".safe_constantize
    end
  end
end
