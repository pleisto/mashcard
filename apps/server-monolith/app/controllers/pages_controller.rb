# typed: false
# frozen_string_literal: true

class PagesController < ApplicationController
  def pwa
    authenticate_user! if request.path === '/'
  end

  def unsupported
  end
end
