# frozen_string_literal: true

module Mutations
  module Users
    class ForgetPasswordMailSend < ::Mutations::BaseMutation
      graphql_name 'UserForgetPasswordMailSend'
      include DeviseGraphQLHelper

      argument :email, Scalars::Email, "User's email address", required: true

      SEND_INTERVAL = 50.seconds

      def resolve(email:)
        Mashcard::Redis.with(:state) do |redis|
          key = "graphql:mutation:userForgetPasswordMailSend/#{email.to_data_masking}"
          return { errors: [I18n.t('errors.messages.send_interval')] } if redis.exists?(key)

          user_authentication = ::Users::Authentication.find_by(email: email)
          return { errors: ["Email #{I18n.t('errors.messages.not_found')}"] } if user_authentication.nil?

          token = user_authentication.send_reset_password_instructions
          redis.setex(key, SEND_INTERVAL, token)
          {}
        end
      end
    end
  end
end
