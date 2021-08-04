# frozen_string_literal: true

module BrickGraphQL
  class BaseField < ::GraphQL::Schema::Field
    argument_class BaseArgument

    def initialize(*args, default_value: nil, **kwargs, &block)
      # puts kwargs
      super(*args, **kwargs, &block)
      extension(BrickGraphQL::Extensions::DefaultValueExtension,
                default_value: default_value) unless default_value.nil?
    end
  end
end
