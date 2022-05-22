# typed: false
# frozen_string_literal: true

module Devtools
  class CypressController < Devtools::ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :cypress_env, :initialize_user

    def session_mock
      user = if params[:email].present?
        Accounts::User.find_by!(email: params.require(:email))
      else
        Accounts::User.where.not(confirmed_at: nil).first!
      end
      sign_in(user)
      redirect_to URI.parse(params.require(:redirect_to)).path
    end

    private

    def cypress_env
      render(status: :forbidden, body: nil) unless Rails.env.development? || Rails.env.test?
    end

    def initialize_user
      if params[:email].present? && Accounts::User.find_by(email: params[:email]).blank?
        FactoryBot.create(:accounts_user, email: params[:email])
      else
        FactoryBot.create(:accounts_user) unless Accounts::User.exists?
      end
    end
  end
end
