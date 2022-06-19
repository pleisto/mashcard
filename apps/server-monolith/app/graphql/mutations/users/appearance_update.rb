# frozen_string_literal: true

module Mutations
  module Users
    class AppearanceUpdate < ::Mutations::BaseMutation
      graphql_name 'UserAppearanceUpdate'
      # TODO: change locale and timezone to enum
      argument :locale, String, description_same(Types::User, :locale), required: false
      argument :timezone, String, description_same(Types::User, :timezone), required: false

      def resolve(locale:, timezone:)
        current_user.config.set(:locale, locale) if locale.present?
        current_user.config.set(:timezone, timezon) if timezone.present?

        {}
      end
    end
  end
end
