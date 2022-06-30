# frozen_string_literal: true

module CurrentPod
  extend ActiveSupport::Concern

  def current_pod
    fetch_pod_by_user || ::Pod::ANONYMOUS_CONTEXT
  end

  private

  def fetch_pod_by_user
    return nil if current_user.nil?

    ### NOTE via session
    # pod = warden.session['current_pod']
    # return pod if pod
    # pod = current_user.fetch_current_pod_cache.as_session_context
    # warden.session['current_pod'] = pod

    ## TODO graphql
    remote_pod =
      if request.params['controller'] == 'pages'
        warden.session['current_pod'] = fetch_pod_via_params
      else
        warden.session['current_pod']
      end

    remote_pod || current_user.fetch_current_pod_cache.as_session_context
  end

  def fetch_pod_via_params
    ## NOTE Get pod via URL params
    domain = request.params['path'].to_s.split('/')[0]
    return nil if domain.blank?

    pod = current_user.pods.find { |p| p.username === domain }

    return pod.as_session_context if pod

    Rails.logger.error("Can't find pod: #{current_user.id} #{domain}")

    nil
  end
  
end
