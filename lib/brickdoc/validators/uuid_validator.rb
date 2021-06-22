# frozen_string_literal: true

module Brickdoc
  module Validators
    class UUIDValidator < ActiveModel::EachValidator
      # webid limited to alphanumerics and hyphens, and must start and end with an alphanumeric.
      REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

      def validate_each(record, attribute, value)
        record.errors.add attribute, :invalid if value !~ REGEXP
      end
    end
  end
end
