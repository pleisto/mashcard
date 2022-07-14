# frozen_string_literal: true

class PagesController < ApplicationController
  protect_from_forgery except: :server_context

  def pwa
    if config.public_file_server&.enabled
      render file: Rails.public_path.join('index.html'), layout: false
    else
      redirect_to "http://localhost:3000#{request.env['PATH_INFO']}"
    end
  end

  def server_context
    render js: "window.mashcardContext = #{helpers.global_context.to_json}\n", layout: false
  end
end
