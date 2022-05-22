# typed: true
# frozen_string_literal: true

module BrickdocSettings
  class Error < StandardError; end

  class ReadOnlyField < Error
    def initialize(settings, key, scope: '')
      super("#{settings}: Field `#{key}`#{scope.present? ? " under scope `#{scope}`" : ''} is read only.")
    end
  end
end
