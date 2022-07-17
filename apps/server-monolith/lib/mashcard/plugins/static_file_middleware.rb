# frozen_string_literal: true

module Mashcard
  module Plugins
    # A Rack middleware to serve static files for plugins
    class StaticFileMiddleware
      def initialize(app, options)
        @app = app
        @plugin_instance = options[:plugin_instance]
        path = @plugin_instance.path
        @static = Rack::Static.new(app, urls: [''], root: "#{path}/public", index: 'index.html')
      end

      def call(env)
        orig_path = env['PATH_INFO']
        resp = @static.call(env.merge!({ 'PATH_INFO' => orig_path.delete_prefix("/$plugin.#{@plugin_instance.id}/") }))
        if (403..405).exclude?(resp[0])
          resp
        else
          @app.call(env.merge!({ 'PATH_INFO' => orig_path }))
        end
      end
    end
  end
end
