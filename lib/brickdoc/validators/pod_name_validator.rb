# frozen_string_literal: true

module Brickdoc
  module Validators
    class PodNameValidator < ActiveModel::EachValidator
      # Pod name limited to alphanumerics and hyphens, and must start and end with an alphanumeric.
      REGEXP = /\A[a-z0-9]+(-[a-z0-9]+)*\z/i

      def validate_each(record, attribute, value)
        message = 'is not a valid name'
        if value !~ REGEXP || Brickdoc::PodNameBlacklist.all.include?(value)
          record.errors.add attribute, :invalid, message: message
        end
      end
    end
  end
end
