# frozen_string_literal: true

module Resolvers
  class Pod < BaseResolver
    description 'return current pod for user.'

    argument :domain, GraphQL::Types::String, required: true
    type Types::Pod, null: false
    authenticate_user!

    def resolve(domain:)
      pod = current_user.pods([:owner]).find { |p| p.username == domain }
      raise Mashcard::GraphQL::Errors::ArgumentError, :invalid_pod if pod.nil?

      pod.pod_as_json_by_user(current_user)
    end
  end
end
