# frozen_string_literal: true
module System
  class Mutations::PodDestroy < BrickGraphQL::BaseMutation
    argument :webid, String, "webid", required: true

    def resolve(webid:)
      pod = current_user.pods.find { |p| p.webid == webid }
      return { errors: [I18n.t('accounts.errors.invalid_operation_type')] } if pod.blank?
      success = pod.destroy_pod!
      success ? {} : { errors: errors_on_object(id) }
    end
  end
end
