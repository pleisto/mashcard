# frozen_string_literal: true

module Mutations
  module Pods
    class Join < ::Mutations::BaseMutation
      graphql_name 'JoinPod'
      argument :invite_secret, String, 'invite secret', required: false

      def resolve(invite_secret:)
        pod = Pod.find_by(invite_secret: invite_secret, personal: false)
        return { errors: [I18n.t('errors.graphql.argument_error.invalid_pod')] } if pod.nil?

        return { errors: [I18n.t('errors.graphql.argument_error.pod_disable_invite')] } unless pod.invite_enable

        member = pod.all_members.find_by(user_id: current_user.id)

        if member
          return { errors: [I18n.t('errors.graphql.argument_error.already_invited')] } if member.enabled?

          member.enabled!
        else
          pod.members.create!(user_id: current_user.id, role: 'member')
        end
        nil
      end
    end
  end
end
