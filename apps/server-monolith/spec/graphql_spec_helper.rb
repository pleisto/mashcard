# frozen_string_literal: true

module GraphqlHelpers
  attr_accessor :response, :current_user, :current_pod

  class Response
    attr_reader :data, :errors

    def initialize(data, errors)
      @data = data || {}
      @errors = errors || {}
    end

    def success?
      !failure?
    end

    def failure?
      errors.present?
    end
  end

  def graphql_execute(statement, variables = {})
    result = BrickdocSchema.execute(statement, variables: variables, context: make_context)
      .to_h.with_indifferent_access
    self.response = Response.new(result[:data], result[:errors])
  end

  def make_context
    {
      protocol: 'http',
      real_ip: 'fe80:0000:0000::0042',
      current_user: current_user,
      current_pod: current_pod,
      session: request.session,
      request_id: FFaker::Guid.guid,
      routes: Rails.application.routes.url_helpers,
      warden: request.env['warden'],
    }
  end

  def request
    return @request if @request.is_a? ActionDispatch::TestRequest

    @request = ActionDispatch::TestRequest.create
    @request.session = ActionController::TestSession.new
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @request.env['warden'] = spy(Warden)
    @request
  end
end
