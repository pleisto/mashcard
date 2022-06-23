# frozen_string_literal: true

## Set current_user and current config before action
module CurrentContextSetter
  extend ActiveSupport::Concern

  included do
    before_action :set_current_model, :set_current_config
  end

  private

  def set_current_model
    Current.user = current_user
    Current.pod = current_pod
  end

  def set_current_config
    MashcardConfig.current = MashcardConfig.at(user_id: Current.user&.id, pod_id: current_pod&.fetch('id'))
  end
end
