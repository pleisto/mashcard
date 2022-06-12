# frozen_string_literal: true

module Brickdoc
  module Validators
    class EmailValidator < ActiveModel::EachValidator
      REGEXP = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\z/i

      def validate_each(record, attribute, value)
        record.errors.add attribute, ::I18n.t('errors.messages.email_invalid') unless REGEXP.match?(value)
      end
    end
  end
end
