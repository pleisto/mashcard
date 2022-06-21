# frozen_string_literal: true

module Resolvers
  class PodMembers < BaseResolver
    description 'return all pod users'
    type [Types::Pods::Member], null: true
    # authenticate_user!

    def resolve
      domain = current_pod.fetch('domain')
      pod = ::Pod.find_by(domain: domain)
      raise Mashcard::GraphQL::Errors::ArgumentError, :invalid_pod if pod.nil?

      pod.members.includes(user: [personal_pod: :avatar_attachment])
    end
  end
end
