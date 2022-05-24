# frozen_string_literal: true

module BrickGraphQL
  module Errors
    ArgumentError = Class.new(BaseError)
    ResourceNotAvailableError = Class.new(BaseError)
    RuntimeError = Class.new(BaseError)
  end
end
