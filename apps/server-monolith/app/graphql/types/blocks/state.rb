# frozen_string_literal: true

module Types
  module Blocks
    class State < Types::BaseObject
      graphql_name 'BlockState'
      description 'MashCard Docs::BlockState'

      has_primary_key uuid: true
      field :block_id, Scalars::UUID, null: true
      field :created_at, GraphQL::Types::ISO8601DateTime, 'Created at', null: false
      field :prev_state_id, Scalars::UUID, null: true
      field :state, String
      field :state_type, Types::Statetype, 'State Type'

      def state
        object.respond_to?(:state) ? Mashcard::Utils::Encoding::Base64.strict_encode64(object.state) : nil
      end
    end
  end
end
