# frozen_string_literal: true

module Mutations
  module Groups
    class Leave < ::Mutations::BaseMutation
      graphql_name 'GroupLeave'
      argument :domain, String, 'Pod domain', required: true
      argument :user_domain, String, 'User domain', required: true

      def resolve(domain:, user_domain:)
        group = current_user.groups.find { |p| p.username == domain }
        return { errors: [I18n.t('settings.errors.invalid_operation_type')] } if group.nil?

        forbidden = group.owner != current_user && user_domain != current_user.domain
        return { errors: [I18n.t('settings.errors.invalid_operation_type')] } if forbidden

        member = group.members.find { |p| p.user.username == user_domain }
        return { errors: [I18n.t('settings.errors.invalid_operation_type')] } if member.nil?

        success = member.destroy
        success ? {} : { errors: errors_on_object(id) }
      end
    end
  end
end
