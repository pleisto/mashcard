# frozen_string_literal: true

class PagesController < ApplicationController
  protect_from_forgery except: :server_context

  def pwa
    if Rails.application.config.public_file_server.enabled
      render file: Rails.public_path.join('index.html'), layout: false
    else
      redirect_to "http://localhost:3000#{request.path}", allow_other_host: true
    end
  end

  def server_context
    render js: "window.mashcardContext = #{helpers.global_context.to_json}\n", layout: false
  end
end

Mashcard::Plugins::ServerPlugin.prepend_from_extended_edition!(PagesController)
