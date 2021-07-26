# frozen_string_literal: true

module BrickGraphQL
  module Concerns::AuthenticateUser
    extend ActiveSupport::Concern

    class_methods do
      def authenticate_user!
        @authenticate_user = true
      end

      def authorized?(object, context)
        return super unless @authenticate_user
        context[:current_user].present? && context[:current_pod].present? && super
      end
    end
  end
end
