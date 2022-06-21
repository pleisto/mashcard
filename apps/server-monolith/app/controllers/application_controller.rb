# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include I18nable
  include CurrentPod
  before_action :set_current_model, :set_current_config, :set_prepend_view_path
  around_action :switch_locale

  # memoize extended edition view path
  def self.extended_edition_view_parh
    @extended_edition_path ||= begin
      return nil unless Mashcard::Plugins::ServerPlugin.extended_edition_path

      File.join(Mashcard::Plugins::ServerPlugin.extended_edition_path, 'app/views')
    end
  end

  protected

  def set_current_model
    Current.user = current_user&.user
    Current.pod = current_pod
  end

  def set_current_config
    MashcardConfig.current = MashcardConfig.at(user_id: current_user&.user_id, pod_id: current_pod['id'])
  end

  # Load view path for a plugin that declares themselves as an extended edition
  def set_prepend_view_path
    prepend_view_path(self.class.extended_edition_view_parh) if self.class.extended_edition_view_parh
  end
end
