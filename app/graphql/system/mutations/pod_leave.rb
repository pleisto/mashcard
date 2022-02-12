# frozen_string_literal: true
module System
  class Mutations::PodLeave < BrickGraphQL::BaseMutation
    argument :webid, String, "Pod webid", required: true
    argument :user_webid, String, "User webid", required: true

    def resolve(webid:, user_webid:)
      pod = current_user.pods.find { |p| p.webid == webid }
      forbidden = pod.blank? || (pod.owner != current_user && user_webid != current_user.webid)
      return { errors: [I18n.t('settings.errors.invalid_operation_type')] } if forbidden
      success = pod.members.find { |m| m.user.webid == user_webid }.destroy
      success ? {} : { errors: errors_on_object(id) }
    end
  end
end
