# frozen_string_literal: true
module System
  class Mutations::UpdateMember < BrickGraphQL::BaseMutation
    argument :webid, String, "webid", required: true
    argument :role, Enums::MemberRole, 'role', required: true
    argument :state, Enums::MemberState, 'state', required: true

    def resolve(attrs)
      webid = attrs.fetch(:webid)
      role = attrs.fetch(:role)
      state = attrs.fetch(:state)

      current_webid = current_pod.fetch('webid')
      pod = Pod.find_by(webid: current_webid)
      raise BrickGraphQL::Errors::ArgumentError, :invalid_pod if pod.nil? || pod.owner != current_user

      user = Pod.find_by(webid: webid)&.owner
      raise BrickGraphQL::Errors::ArgumentError, :invalid_user if user.nil?

      member = pod.members.find_by(user_id: user.id)
      raise BrickGraphQL::Errors::ArgumentError, :invalid_member if member.nil?

      member.update!(role: role, state: state)

      nil
    end
  end
end
