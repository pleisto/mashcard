# frozen_string_literal: true

module Scalars
  class MetaJson < GraphQL::Types::JSON
    description 'Meta Json'

    REJECT_KEYS = ['__typename']

    def self.coerce_input(value, context)
      case value
      when ActionController::Parameters
        coerce_input(value.to_unsafe_h, context)
      when Array
        value.map { |v| coerce_input(v, context) }
      when Hash
        value.select { |k, _v| REJECT_KEYS.exclude?(k) }.map { |k, v| [k, coerce_input(v, context)] }.to_h
      else
        value
      end
    end
  end
end
