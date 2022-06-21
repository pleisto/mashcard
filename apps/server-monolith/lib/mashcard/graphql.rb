# frozen_string_literal: true

module Mashcard
  module GraphQL
    def self.ensure_hash(ambiguous_param)
      case ambiguous_param
      when String
        ambiguous_param.present? ? ensure_hash(Oj.load(ambiguous_param)) : {}
      when Hash, ActionController::Parameters
        ambiguous_param
      when nil
        {}
      else
        raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
      end
    end
  end
end
