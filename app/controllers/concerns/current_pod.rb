# frozen_string_literal: true

module CurrentPod
  extend ActiveSupport::Concern

  def current_pod
    fetch_pod_by_user || Pod::ANONYMOUS_CONTEXT
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
      if graphql?
        warden.session['current_pod']
      else
        fetch_pod_via_params.tap do |pod|
          warden.session['current_pod'] = pod
        end
      end

    remote_pod || current_user.fetch_current_pod_cache.as_session_context
  end

  def fetch_pod_via_params
    ## NOTE Get pod via URL params
    webid = request.params['path'].to_s.split('/')[0]
    return nil if webid.blank?
    pod = current_user.pods.find_by(webid: webid)

    return pod.as_session_context if pod
    Rails.logger.error("Can't find pod: #{current_user.id} #{webid}")

    nil
  end

  def graphql?
    internal_graphql_api_path == request.path
  end
end
