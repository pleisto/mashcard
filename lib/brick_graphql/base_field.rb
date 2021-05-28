# frozen_string_literal: true

module BrickGraphQL
  class BaseField < ::GraphQL::Schema::Field
    argument_class BaseArgument
  end
end
