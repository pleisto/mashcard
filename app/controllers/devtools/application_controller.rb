# frozen_string_literal: true
class Devtools::ApplicationController < ::ApplicationController
  before_action :double_check_env

  protected

  def double_check_env
    render(status: :forbidden, body: nil) if Rails.env.production?
  end
end
