# typed: strict
# frozen_string_literal: true

class RootMutation < BrickGraphQL::BaseObject
  include AutoGraphQLFields

  add_fields_for BrickGraphQL::Component.mutation_modules(BrickdocSchema::NAMESPACES), :mutation
end
