# frozen_string_literal: true
module System
  class Mutations::UpdateDomain < BrickGraphQL::BaseMutation
    argument :domain, String, "current domain", required: true
    argument :new_domain, String, "new domain", required: true

    def resolve(domain:, new_domain:)
      # TODO: permission check
      space = current_user.spaces.find { |p| p.domain == domain }
      return { errors: [I18n.t('accounts.errors.space_not_exist')] } if space.nil?
      space.domain = new_domain
      success = space.save
      return { errors: space.errors.full_messages } unless success
      {}
    end
  end
end
