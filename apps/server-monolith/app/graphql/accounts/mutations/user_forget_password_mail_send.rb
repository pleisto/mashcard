# frozen_string_literal: true

module Accounts
  module Mutations
    class UserForgetPasswordMailSend < BrickGraphQL::BaseMutation
      include DeviseGraphQLHelper
      requires_entrypoint_to_be :internal

      argument :email, BrickGraphQL::Scalars::Email, description_same(Objects::User, :email), required: true

      SEND_INTERVAL = 50.seconds

      def resolve(email:)
        Brickdoc::Redis.with(:state) do |redis|
          key = "graphql:mutation:userForgetPasswordMailSend/#{email.to_data_masking}"
          return { errors: [I18n.t('errors.messages.send_interval')] } if redis.exists?(key)

          user = Accounts::User.find_by(email: email)
          return { errors: ["Email #{I18n.t('errors.messages.not_found')}"] } if user.nil?

          token = user.send_reset_password_instructions
          redis.setex(key, SEND_INTERVAL, token)
          {}
        end
      end
    end
  end
end
