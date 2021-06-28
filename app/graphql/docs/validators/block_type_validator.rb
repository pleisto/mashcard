# frozen_string_literal: true
module Docs
  # Use this to valid block's type arguments
  class Validators::BlockTypeValidator < GraphQL::Schema::Validator
    def initialize(**default_options)
      super(**default_options)
    end

    def validate(_object, context, value)
      type = Objects::Block.resolve_type(OpenStruct.new(type: value), context)
      return "invalid type argument" if type.blank? || value.blank?
      nil
    end
  end
end
