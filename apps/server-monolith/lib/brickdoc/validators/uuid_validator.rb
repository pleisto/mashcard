# frozen_string_literal: true

module Brickdoc
  module Validators
    class UUIDValidator < ActiveModel::EachValidator
      REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

      def validate_each(record, attribute, value)
        record.errors.add attribute, ::I18n.t('errors.messages.uuid_invalid') unless REGEXP.match?(value)
      end
    end
  end
end
