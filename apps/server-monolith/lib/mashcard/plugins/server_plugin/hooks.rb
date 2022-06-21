# frozen_string_literal: true

module Mashcard
  module Plugins
    module ServerPlugin
      module Hooks
        class << self
          #  Oauth2 provider hook
          # @param [Devise.setup.config] config
          def oauth_provider(config)
            ServerPlugin.find_hook(:oauth_provider)&.each { |_id, block| config.omniauth(*block) }
          end
        end
      end
    end
  end
end
