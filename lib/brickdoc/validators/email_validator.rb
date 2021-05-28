# frozen_string_literal: true

module Brickdoc
  module Validators
    class EmailValidator < ActiveModel::EachValidator
      REGEXP = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\z/i

      def validate_each(record, attribute, value)
        record.errors.add attribute, :invalid, message: (options[:message] || 'is not an email') unless value =~ REGEXP
      end
    end
  end
end
