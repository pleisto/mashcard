# frozen_string_literal: true

module Brickdoc
  class DeviseFailureApp < Devise::FailureApp
    def respond
      around_i18n do
        if request.params[:operationName].present? && request.params[:query].present?
          graphql_user_level_errors
        elsif http_auth?
          http_auth
        elsif warden_options[:recall]
          recall
        else
          redirect
        end
      end
    end

    def graphql_user_level_errors
      operation_name = request.params[:operationName]
      results = {
        errors: [i18n_message],
        '__typename': "#{operation_name}Payload".camelize,
      }

      # make all data fields nullable.
      ast = GraphQL.parse(params[:query])
      fields = ast.children[0].selections.find { |i| i.name === operation_name }
        .selections.map(&:name) - ['errors', '__typename']
      fields.each { |f| results[f] = nil }

      self.response_body = Oj.dump({ data: { operation_name => results } })
    end

    private

    def around_i18n(&action)
      # Rack has a different request context than Rails, so include I18nable does not apply to rack.
      locales = request.cookies['default_locale'] ||
        Brickdoc::I18n.parse_accept_language(request.headers.fetch('HTTP_ACCEPT_LANGUAGE', nil))
      I18n.with_locale(locales, &action)
    end
  end
end
