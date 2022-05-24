# frozen_string_literal: true

class CreateDocsDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :docs_documents, id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
      t.binary :state
      t.uuid :state_id

      t.timestamps
    end
  end
end
