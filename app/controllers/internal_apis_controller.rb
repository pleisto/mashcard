# frozen_string_literal: true

class InternalApisController < ActionController::API
  include Apiable
  include CurrentPod
  include I18nable
  include ActionController::Cookies
  around_action :switch_locale

  # i18next.js
  def show_locales
    @locale = params[:locale]&.to_sym
    @ns = params[:ns]&.to_sym
    raise ActionController::RoutingError, 'Not Found' unless Brickdoc::I18n.available_locales.include? @locale
    @translations = ::I18n.t(@ns, locale: @locale, default: {})
    render json: Oj.dump(@translations)
  end

  # internal graphql api entrypoint
  def graphql
    variables = BrickGraphQL.ensure_hash params[:variables]
    resp = BrickdocSchema.execute(params[:query], variables: variables,
                                  context: context, operation_name: params[:operationName])
    render json: Oj.dump(resp)
  end

  private

  def context
    {
      protocol: 'http',
      real_ip: request.remote_ip,
      entrypoint: :internal,
      current_user: current_user,
      current_pod: current_pod,
      session: session,
      request_id: request.uuid,
      routes: Rails.application.routes.url_helpers,
      warden: request.env['warden']
    }
  end
end
