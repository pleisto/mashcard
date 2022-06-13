# frozen_string_literal: true

module Docs
  module Mutations
    class BlockCommit < BrickGraphQL::BaseMutation
      argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
      argument :document_id, BrickGraphQL::Scalars::UUID, 'document id', required: true
      argument :operator_id, String, 'operator id', required: true
      argument :prev_state_id, BrickGraphQL::Scalars::UUID, 'previous state id', required: false
      argument :state, String, 'full or update state', required: true
      argument :state_id, BrickGraphQL::Scalars::UUID, 'state id', required: true
      argument :state_type, Enums::Statetype, 'state type', required: true
      argument :states_count, Integer, 'states count', required: true

      field :block, Docs::Objects::BlockNew, null: true
      field :diff_states, [Docs::Objects::BlockState], 'Differ Block States with current state', null: true
      field :require_full, Boolean, null: true

      def resolve(args)
        block = Docs::Block.non_deleted.find(args[:block_id])
        states_count = block.states.count

        diff_states = []

        if block.state_id.blank? || (block.state_id == args[:prev_state_id])
          if (args[:state_type] != 'full') && block.state_id.present?
            states_count = Docs::BlockState.where(block_id: block.id).where(
              'id = :state_id OR prev_state_id = :state_id', state_id: block.state_id
            ).count
            if states_count > BrickdocConfig.state_max_updates
              return {
                block: block,
                diff_states: diff_states,
                require_full: true,
              }
            end
          end

          state_model = Docs::BlockState.where(id: args[:state_id]).first_or_initialize
          state_model.state = Brickdoc::Utils::Encoding::Base64.strict_decode64(args[:state])
          state_model.state_type = args[:state_type]
          state_model.prev_state_id = args[:prev_state_id]
          state_model.document_id = args[:document_id]
          state_model.block_id = args[:block_id]
          state_model.pod_id = current_pod.fetch('id')
          state_model.user_id = current_user.id
          Docs::Block.transaction do
            state_model.save!

            # set block state id when have full state
            if state_model.state_type == 'full'
              block.state_id = args[:state_id]
              block.save
            end
          end

          if states_count != args[:states_count]
            diff_states = block.states_sorted
          end

          # TODO: if block is not document, get its doc id for subscription
          BrickdocSchema.subscriptions.trigger(:document, { doc_id: block.id }, {
            operator_id: args[:operator_id],
            blocks: [block],
            states: [state_model],
            histories: [state_model.history],
          })
        else
          diff_states = block.states_sorted
        end
        {
          block: block,
          diff_states: diff_states,
        }
      end
    end
  end
end