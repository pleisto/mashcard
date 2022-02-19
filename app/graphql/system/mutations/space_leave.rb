# frozen_string_literal: true
module System
  class Mutations::SpaceLeave < BrickGraphQL::BaseMutation
    argument :domain, String, "Space domain", required: true
    argument :user_domain, String, "User domain", required: true

    def resolve(domain:, user_domain:)
      space = current_user.spaces.find { |p| p.domain == domain }
      forbidden = space.blank? || (space.owner != current_user && user_domain != current_user.domain)
      return { errors: [I18n.t('settings.errors.invalid_operation_type')] } if forbidden
      success = space.members.find { |m| m.user.domain == user_domain }.destroy
      success ? {} : { errors: errors_on_object(id) }
    end
  end
end
