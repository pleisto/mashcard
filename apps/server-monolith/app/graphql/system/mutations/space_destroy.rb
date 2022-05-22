# typed: false
# frozen_string_literal: true

module System
  module Mutations
    class SpaceDestroy < BrickGraphQL::BaseMutation
      argument :domain, String, 'domain', required: true

      def resolve(domain:)
        space = current_user.spaces.find { |p| p.domain == domain }
        return { errors: [I18n.t('accounts.errors.invalid_operation_type')] } if space.blank?

        success = space.destroy_space!
        success ? {} : { errors: errors_on_object(id) }
      end
    end
  end
end
