# typed: false
# frozen_string_literal: true

module Patches
  module ActionDispatch
    module DrawRoute
      RoutesNotFound = Class.new(StandardError)

      def draw(routes_name)
        draw_route(route_path("config/routes/#{routes_name}.rb")) ||
          raise(RoutesNotFound, "Cannot find #{routes_name}")
      end

      def route_path(routes_name)
        Rails.root.join(routes_name)
      end

      def draw_route(path)
        if File.exist?(path)
          instance_eval(File.read(path))
          true
        else
          false
        end
      end
    end
  end
end
