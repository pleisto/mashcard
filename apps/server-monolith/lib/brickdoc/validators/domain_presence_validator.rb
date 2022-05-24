# frozen_string_literal: true

module Brickdoc
  module Validators
    class DomainPresenceValidator < ActiveModel::Validator
      def validate(record)
        field = options[:field]
        domain = record.send(field)

        exists = Space.exists?(domain: domain)

        record.errors.add field, ::I18n.t('errors.messages.domain_presence_invalid') unless exists
      end
    end
  end
end
