# frozen_string_literal: true
class Devtools::CypressController < Devtools::ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :cypress_env, :initialize_user

  def session_mock
    user = params[:email].present? ? Accounts::User.find_by!(email: params.require(:email)) :
             Accounts::User.where('confirmed_at is not null').first!
    sign_in(user)
    redirect_to URI.parse(params.require(:redirect_to)).path
  end

  private

  def cypress_env
    render(status: :forbidden, body: nil) unless Rails.env.development? || Rails.env.test?
  end

  def initialize_user
    if params[:email].present? && Accounts::User.find_by_email(params[:email]).blank?
      FactoryBot.create(:accounts_user, email: params[:email])
    else
      FactoryBot.create(:accounts_user) unless Accounts::User.exists?
    end
  end
end
