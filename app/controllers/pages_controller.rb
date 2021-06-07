# frozen_string_literal: true

class PagesController < ApplicationController
  def pwa
    authenticate_user!
  end

  def unsupported
  end
end
