# frozen_string_literal: true

module Mutations
  module Groups
    class UpdateMember < ::Mutations::BaseMutation
      graphql_name 'GroupUpdateMember'
      argument :domain, String, 'domain', required: true
      argument :role, Types::Pods::MemberRole, 'role', required: true
      argument :state, Types::Pods::MemberState, 'state', required: true

      def resolve(attrs)
        domain = attrs.fetch(:domain)
        role = attrs.fetch(:role)
        state = attrs.fetch(:state)

        current_domain = current_pod.fetch('username')
        group = Pod.find_by(username: current_domain)
        raise Mashcard::GraphQL::Errors::ArgumentError, :invalid_pod if group.nil? || group.owner != current_user

        user = User.find_by(username: domain)
        raise Mashcard::GraphQL::Errors::ArgumentError, :invalid_user if user.nil?

        member = group.members.find_by(user_id: user.id)
        raise Mashcard::GraphQL::Errors::ArgumentError, :invalid_member if member.nil?

        member.update!(role: role, state: state)

        nil
      end
    end
  end
end
