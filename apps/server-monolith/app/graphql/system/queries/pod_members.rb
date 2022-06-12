# frozen_string_literal: true

module System
  module Queries
    class PodMembers < BrickGraphQL::BaseResolver
      description 'return all pod users'
      type [System::Objects::PodMember], null: true
      # authenticate_user!

      def resolve
        domain = current_pod.fetch('domain')
        pod = ::Pod.find_by(domain: domain)
        raise BrickGraphQL::Errors::ArgumentError, :invalid_pod if pod.nil?

        pod.members.includes(user: [personal_pod: :avatar_attachment])
      end
    end
  end
end
