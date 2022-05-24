# frozen_string_literal: true

module Devtools
  class ApplicationController < ::ApplicationController
    before_action :double_check_env

    protected

    def double_check_env
      render(status: :forbidden, body: nil) if Rails.env.production?
    end
  end
end
