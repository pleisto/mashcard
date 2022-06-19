# frozen_string_literal: true

module Types
  class BaseField < ::GraphQL::Schema::Field
    def initialize(*args, default_value: nil, **kwargs, &block)
      super(*args, **kwargs, &block)
      extension(Brickdoc::GraphQL::Extensions::DefaultValueExtension,
        default_value: default_value) unless default_value.nil?
    end
  end
end
