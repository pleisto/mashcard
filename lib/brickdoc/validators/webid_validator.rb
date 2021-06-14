# frozen_string_literal: true

module Brickdoc
  module Validators
    class WebidValidator < ActiveModel::EachValidator
      # webid limited to alphanumerics and hyphens, and must start and end with an alphanumeric.
      REGEXP = /\A[a-z0-9]+(-[a-z0-9]+)*\z/i

      def validate_each(record, attribute, value)
        message = ::I18n.t('errors.messages.is_not_valid_webid')
        if value !~ REGEXP || Brickdoc::WebidBlacklist.all.include?(value)
          record.errors.add attribute, :invalid, message: message
        end
      end
    end
  end
end
