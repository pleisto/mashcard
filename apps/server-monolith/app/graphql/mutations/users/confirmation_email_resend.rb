# frozen_string_literal: true

module Mutations
  module Users
    class ConfirmationEmailResend < ::Mutations::BaseMutation
      graphql_name 'UserConfirmationEmailResend'
      argument :email, Scalars::Email, description_same(Types::User, :email), required: true

      SEND_INTERVAL = 50.seconds

      def resolve(email:)
        Mashcard::Redis.with(:state) do |redis|
          key = "graphql:mutation:userConfirmationEmailResend/#{email.to_data_masking}"
          return { errors: [I18n.t('errors.messages.send_interval')] } if redis.exists?(key)

          user_authentication = ::Users::Authentication.find_by(email: email, confirmed_at: nil)
          if user_authentication.nil?
            { errors: ["Email #{I18n.t('errors.messages.not_found')}"] }
          elsif user_authentication.resend_confirmation_instructions
            redis.setex(key, SEND_INTERVAL, '1')
            {}
          end
        end
      end
    end
  end
end
