# frozen_string_literal: true

module BrickGraphQL
  class BaseResolver < ::GraphQL::Schema::Resolver
    argument_class BaseArgument
    include GraphQL::FragmentCache::ObjectHelpers
    include BrickGraphQL::Concerns::EntrypointValidatable
    include ActionPolicy::GraphQL::Behaviour
    # override graphql-ruby
    # When the `resolve` method does not exist, the `field` is returned directly
    def resolve(**_args)
      @field
    end

    def current_user
      context[:current_user]
    end
  end
end
