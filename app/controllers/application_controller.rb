# frozen_string_literal: true
class ApplicationController < ActionController::Base
  prepend_view_path(Brickdoc::SaaS.root.join('app', 'views')) if Brickdoc.saas?
  include I18nable
  include CurrentPod
  helper SaaSHelper if Brickdoc
  before_action :set_current_model
  around_action :switch_locale

  protected

  def set_current_model
    Current.user = current_user
    Current.pod = current_pod
  end
end
