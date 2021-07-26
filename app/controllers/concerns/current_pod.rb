# frozen_string_literal: true

module CurrentPod
  extend ActiveSupport::Concern

  def current_pod
    return nil if current_user.nil?

    ### NOTE via session
    # pod = warden.session['current_pod']
    # return pod if pod
    # pod = current_user.personal_pod.as_session_context
    # warden.session['current_pod'] = pod

    fetch_pod || current_user.personal_pod.as_session_context
  end

  private

  def fetch_pod
    ## NOTE Get pod via URL params
    webid = request.params['path']
    return nil if webid.nil?
    pod = current_user.pods.find_by(webid: webid)

    return pod.as_session_context if pod
    Rails.logger.error("Can't find pod: #{current_user.id} #{webid}")

    nil
  end
end
