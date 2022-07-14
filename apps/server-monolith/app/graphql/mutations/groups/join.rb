# frozen_string_literal: true

module Mutations
  module Groups
    class Join < ::Mutations::BaseMutation
      graphql_name 'GroupJoin'
      argument :invite_secret, String, 'invite secret', required: false

      def resolve(invite_secret:)
        group_id = Group.invite_secret_to_id(invite_secret)
        group = Group.find_by(id: group_id)
        return { errors: [I18n.t('errors.graphql.argument_error.invalid_pod')] } if group.nil?

        return { errors: [I18n.t('errors.graphql.argument_error.pod_disable_invite')] } unless group.invite_enable

        member = group.all_members.find_by(user_id: current_user.id)

        if member
          return { errors: [I18n.t('errors.graphql.argument_error.already_invited')] } if member.enabled?

          member.enabled!
        else
          group.members.create!(user_id: current_user.id, role: :member)
        end
        {}
      end
    end
  end
end
