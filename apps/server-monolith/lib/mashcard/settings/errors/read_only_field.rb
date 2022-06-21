# frozen_string_literal: true

module Mashcard
  module Settings
    module Errors
      class ReadOnlyField < StandardError
        def initialize(settings, key, namespace: '')
          super("#{settings}: Field `#{key}`#{namespace.present? ? " under namespace `#{namespace}`" : ''} is read only.")
        end
      end
    end
  end
end
