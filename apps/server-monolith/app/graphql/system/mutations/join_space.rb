# frozen_string_literal: true

module System
  module Mutations
    class JoinSpace < BrickGraphQL::BaseMutation
      argument :invite_secret, String, 'invite secret', required: false

      def resolve(invite_secret:)
        space = Space.find_by(invite_secret: invite_secret, personal: false)
        return { errors: [I18n.t('errors.graphql.argument_error.invalid_space')] } if space.nil?

        return { errors: [I18n.t('errors.graphql.argument_error.space_disable_invite')] } unless space.invite_enable

        member = space.all_members.find_by(user_id: current_user.id)

        if member
          return { errors: [I18n.t('errors.graphql.argument_error.already_invited')] } if member.enabled?

          member.enabled!
        else
          space.members.create!(user_id: current_user.id, role: 'member')
        end
        nil
      end
    end
  end
end
