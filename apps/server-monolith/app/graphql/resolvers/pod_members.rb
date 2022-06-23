# frozen_string_literal: true

module Resolvers
  class PodMembers < BaseResolver
    description 'return all pod users'
    type [Types::Pods::Member], null: true
    # authenticate_user!

    def resolve
      username = current_pod.fetch('username')
      pod = ::Pod.find_by(username: username)
      raise Mashcard::GraphQL::Errors::ArgumentError, :invalid_pod if pod.nil?

      return [] if pod.type === 'User'

      pod.members.includes(user: [:authentication, :avatar_attachment])
    end
  end
end
