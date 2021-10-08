# frozen_string_literal: true

module Brickdoc
  module Validators
    class WebidPresenceValidator < ActiveModel::Validator
      def validate(record)
        field = options[:field]
        webid = record.send(field)

        exists = Pod.exists?(webid: webid)

        record.errors.add field,  ::I18n.t("errors.messages.webid_presence_invalid") unless exists
      end
    end
  end
end
