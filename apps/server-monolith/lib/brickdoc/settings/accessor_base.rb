# frozen_string_literal: true

module Brickdoc
  module Settings
    # @private
    # Add method_missing support for Brickdoc::Settings::Base
    module AccessorBase
      # Hook method to return whether the obj can repond to id method or not
      def respond_to_missing?(method_name, *_)
        method_name = method_name[0..-2] if ['=', '?'].include?(method_name[-1])
        defined_keys.include? method_name.to_s
      end

      # When call undefined method in Brickdoc::Settings::Base, it will try to find
      def method_missing(method_name, *args, **options)
        # example: Config.foo = 1
        if method_name[-1] == '='
          set(method_name[0..-2], *args, **options)
        # example:  Config.foo?
        elsif method_name[-1] == '?'
          get(method_name[0..-2], *args, **options).present?
        elsif defined_keys.include? method_name.to_s
          # example: Config.foo
          get(method_name, *args, **options)
        else
          super
        end
      end
    end
  end
end
