# frozen_string_literal: true

module Accounts
  module Mutations
    class UserAppearanceUpdate < BrickGraphQL::BaseMutation
      # TODO: change locale and timezone to enum
      argument :locale, String, description_same(Objects::User, :locale), required: false
      argument :timezone, String, description_same(Objects::User, :timezone), required: false

      def resolve(locale:, timezone:)
        current_user.config.set(:locale, locale) if locale.present?
        current_user.config.set(:timezone, timezon) if timezone.present?

        {}
      end
    end
  end
end
