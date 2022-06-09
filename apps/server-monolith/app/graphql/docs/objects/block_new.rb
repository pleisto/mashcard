# frozen_string_literal: true

module Docs
  module Objects
    class BlockNew < BrickGraphQL::BaseObject
      graphql_name 'blockNew'
      description 'Brickdoc Docs::Block New Scheme'

      has_primary_key uuid: true

      field :block_type, String, 'Block Type'
      field :state_id, String, 'Latest State Id', null: true
      field :states, [BlockState], 'Block States', null: true, method: :states_sorted
      field :states_count, Integer, null: true

      def states_count
        object.states.count
      end
    end
  end
end
