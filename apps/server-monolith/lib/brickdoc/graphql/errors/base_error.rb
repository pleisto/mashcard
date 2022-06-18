# frozen_string_literal: true

module Brickdoc
  module GraphQL
    module Errors
      class BaseError < ::GraphQL::ExecutionError
        def message
          ::I18n.t("errors.graphql.#{type&.underscore}.#{super}")
        end

        def type
          self.class.name.demodulize
        end

        def to_h
          sub_code = exception.to_s.upcase
          # ref: https://spec.graphql.org/draft/#example-fce18
          { extensions: {
            type: type,
            code: "#{type}.#{sub_code}",
          } }.merge(super)
        end
      end
    end
  end
end
