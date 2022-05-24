# frozen_string_literal: true

class RootQuery < BrickGraphQL::BaseObject
  include AutoGraphQLFields

  add_fields_for BrickGraphQL::Component.resolver_modules(BrickdocSchema::NAMESPACES), :resolver
end
