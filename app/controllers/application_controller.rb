# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include I18nable
  before_action :prepend_saas_view_paths
  around_action :switch_locale

  def prepend_saas_view_paths
    prepend_view_path(Brickdoc::SaaS.root.join('app', 'views')) if Brickdoc.saas?
  end
end
