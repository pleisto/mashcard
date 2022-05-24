# frozen_string_literal: true

module CurrentSpace
  extend ActiveSupport::Concern

  def current_space
    fetch_space_by_user || Space::ANONYMOUS_CONTEXT
  end

  private

  def fetch_space_by_user
    return nil if current_user.nil?

    ### NOTE via session
    # space = warden.session['current_space']
    # return space if space
    # space = current_user.fetch_current_space_cache.as_session_context
    # warden.session['current_space'] = space

    ## TODO graphql
    remote_space =
      if graphql?
        warden.session['current_space']
      else
        fetch_space_via_params.tap do |space|
          warden.session['current_space'] = space
        end
      end

    remote_space || current_user.fetch_current_space_cache.as_session_context
  end

  def fetch_space_via_params
    ## NOTE Get space via URL params
    domain = request.params['path'].to_s.split('/')[0]
    return nil if domain.blank?

    space = current_user.spaces.find_by(domain: domain)

    return space.as_session_context if space

    Rails.logger.error("Can't find space: #{current_user.id} #{domain}")

    nil
  end

  def graphql?
    internal_graphql_api_path == request.path
  end
end
