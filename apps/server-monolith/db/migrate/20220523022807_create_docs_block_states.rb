# frozen_string_literal: true

class CreateDocsBlockStates < ActiveRecord::Migration[7.0]
  def change
    create_enum :block_state_type, ['full', 'update']

    create_table :docs_block_states, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.enum 'state_type', enum_type: 'block_state_type', default: 'full', null: false
      t.uuid 'block_id', null: false
      t.binary 'state'
      t.uuid 'prev_state_id'

      t.bigint 'space_id', null: false
      t.bigint 'user_id', null: false

      t.datetime 'created_at', null: false
    end
  end
end
