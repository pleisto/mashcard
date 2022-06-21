# frozen_string_literal: true

module Mashcard
  module Settings
    module Errors
      class NotFoundField < StandardError
        def initialize(settings, key, namespace: '')
          super("#{settings}: Field `#{key}`#{namespace.present? ? " under namespace `#{namespace}`" : ''} is not defiend.")
        end
      end
    end
  end
end
