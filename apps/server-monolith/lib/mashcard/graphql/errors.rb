# frozen_string_literal: true

module Mashcard
  module GraphQL
    module Errors
      ArgumentError = Class.new(BaseError)
      ResourceNotAvailableError = Class.new(BaseError)
      RuntimeError = Class.new(BaseError)
    end
  end
end
