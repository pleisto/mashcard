# typed: false
# frozen_string_literal: true

class BrickdocPlugin
  class Engine < Rails::Engine
    def routes(&block)
      unless @routes
        @routes = ActionDispatch::Routing::RouteSet.new_with_config(config)
        @routes.instance_variable_set :@devise_finalized, true
      end
      @routes.append(&block) if block_given?
      @routes
    end

    def routes?
      @routes.present?
    end
  end
end
