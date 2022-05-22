# typed: true
# frozen_string_literal: true

module System
  module Mutations
    class UpdateMember < BrickGraphQL::BaseMutation
      argument :domain, String, 'domain', required: true
      argument :role, Enums::MemberRole, 'role', required: true
      argument :state, Enums::MemberState, 'state', required: true

      def resolve(attrs)
        domain = attrs.fetch(:domain)
        role = attrs.fetch(:role)
        state = attrs.fetch(:state)

        current_domain = current_space.fetch('domain')
        space = Space.find_by(domain: current_domain)
        raise BrickGraphQL::Errors::ArgumentError, :invalid_space if space.nil? || space.owner != current_user

        user = Space.find_by(domain: domain)&.owner
        raise BrickGraphQL::Errors::ArgumentError, :invalid_user if user.nil?

        member = space.members.find_by(user_id: user.id)
        raise BrickGraphQL::Errors::ArgumentError, :invalid_member if member.nil?

        member.update!(role: role, state: state)

        nil
      end
    end
  end
end
