# frozen_string_literal: true

module System
  module Mutations
    class PodLeave < BrickGraphQL::BaseMutation
      argument :domain, String, 'Pod domain', required: true
      argument :user_domain, String, 'User domain', required: true

      def resolve(domain:, user_domain:)
        pod = current_user.pods.find { |p| p.domain == domain }
        forbidden = pod.blank? || (pod.owner != current_user && user_domain != current_user.domain)
        return { errors: [I18n.t('settings.errors.invalid_operation_type')] } if forbidden

        success = pod.members.find { |m| m.user.domain == user_domain }.destroy
        success ? {} : { errors: errors_on_object(id) }
      end
    end
  end
end
