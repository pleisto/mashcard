# frozen_string_literal: true

module Resolvers
  class BaseResolver < ::GraphQL::Schema::Resolver
    include GraphQL::FragmentCache::ObjectHelpers
    include AuthenticateUser
    include Mashcard::GraphQL::PolicyBehaviour

    # override graphql-ruby
    # When the `resolve` method does not exist, the `field` is returned directly
    # @deprecated
    def resolve(**_args)
      @field
    end

    def current_user
      context[:current_user]
    end

    def current_pod
      context[:current_pod]
    end
  end
end
