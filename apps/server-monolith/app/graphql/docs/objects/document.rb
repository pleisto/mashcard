# typed: true
# frozen_string_literal: true

module Docs
  module Objects
    class Document < BrickGraphQL::BaseObject
      graphql_name 'Document'
      description 'Brickdoc Docs::Document'

      has_primary_key uuid: true
      field :state, String, null: true
      field :state_id, BrickGraphQL::Scalars::UUID, null: true

      def state
        object.respond_to?(:state) ? Base64.strict_encode64(object.state) : nil
        # object.respond_to?(:state) ? object.state : nil
      end
    end
  end
end
