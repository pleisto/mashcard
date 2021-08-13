# frozen_string_literal: true

module Brickdoc
  module Validators
    class MobilePhoneValidator < ActiveModel::EachValidator
      # E.164 format: {dialing code}{phone number}
      # @example: 8618100001234
      REGEXP = /^[1-9]\d{5,13}$/i

      def validate_each(record, attribute, value)
        message = ::I18n.t("errors.messages.mobile_phone_invalid")
        return record.errors.add attribute, message unless value =~ REGEXP
        if value.start_with?('86')
          # Chinese mobile phone validator
          # There are 11 digits. Start with 1{3-9}.
          record.errors.add attribute, message unless value[2..-1] =~ /^[1]([3-9])[0-9]{9}$/
        end
      end
    end
  end
end
