# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include I18nable
  include CurrentSpace
  before_action :set_current_model, :set_current_config
  around_action :switch_locale

  protected

  def set_current_model
    Current.user = current_user
    Current.space = current_space
  end

  def set_current_config
    BrickdocConfig.current = BrickdocConfig.at(user_id: current_user&.id, space_id: current_space[:id])
  end
end
