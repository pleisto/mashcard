# frozen_string_literal: true
module System
  class Mutations::JoinPod < BrickGraphQL::BaseMutation
    argument :invite_secret, String, "invite secret", required: false

    def resolve(invite_secret:)
      pod = Pod.find_by(invite_secret: invite_secret)
      raise BrickGraphQL::Errors::ArgumentError, :invalid_pod if pod.nil?

      raise BrickGraphQL::Errors::ArgumentError, :pod_disable_invite unless pod.invite_enable

      member = pod.all_members.find_by(user_id: current_user.id)

      if member
        raise BrickGraphQL::Errors::ArgumentError, :already_invited if member.enabled?
        member.enabled!
      else
        pod.members.create!(user_id: current_user.id, role: 'member')
      end
      nil
    end
  end
end
