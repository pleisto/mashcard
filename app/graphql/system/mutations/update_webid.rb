# frozen_string_literal: true
module System
  class Mutations::UpdateWebid < BrickGraphQL::BaseMutation
    argument :webid, String, "current webid", required: true
    argument :new_webid, String, "new webid", required: true

    def resolve(webid:, new_webid:)
      # TODO: permission check
      pod = current_user.pods.find { |p| p.webid == webid }
      return { errors: [I18n.t('accounts.errors.pod_not_exist')] } if pod.nil?
      pod.webid = new_webid
      success = pod.save
      return { errors: pod.errors.full_messages } unless success
      {}
    end
  end
end
