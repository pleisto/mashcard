# frozen_string_literal: true

module System
  module Mutations
    class PodDestroy < BrickGraphQL::BaseMutation
      argument :domain, String, 'domain', required: true

      def resolve(domain:)
        pod = current_user.pods.find { |p| p.domain == domain }
        return { errors: [I18n.t('accounts.errors.invalid_operation_type')] } if pod.blank?

        success = pod.destroy_pod!
        success ? {} : { errors: errors_on_object(id) }
      end
    end
  end
end
