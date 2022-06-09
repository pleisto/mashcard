# frozen_string_literal: true

class CreateDocsDocumentHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :docs_document_histories, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.uuid 'document_id', null: false

      t.bigint 'space_id', null: false
      t.bigint 'user_id', null: false

      t.datetime 'created_at', null: false
    end
  end
end
