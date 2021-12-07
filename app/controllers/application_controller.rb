# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include I18nable
  include CurrentPod
  before_action :set_current_model
  around_action :switch_locale

  protected

  def set_current_model
    Current.user = current_user
    Current.pod = current_pod
  end
end
