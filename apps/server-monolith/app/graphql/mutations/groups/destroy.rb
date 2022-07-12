# frozen_string_literal: true

module Mutations
  module Groups
    class Destroy < ::Mutations::BaseMutation
      graphql_name 'GroupDestroy'
      argument :username, String, 'username', required: true

      def resolve(username:)
        group = current_user.groups.find { |p| p.username == username }
        return { errors: [I18n.t('accounts.errors.invalid_operation_type')] } if group.nil?

        success = group.destroy_group!
        success ? {} : { errors: errors_on_object(id) }
      end
    end
  end
end
