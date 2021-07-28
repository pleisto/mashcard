# frozen_string_literal: true
class CreatePods < ActiveRecord::Migration[6.1]
  def change
    create_table :pods do |t|
      t.belongs_to :owner, null: false
      t.string :webid, null: false
      t.string :name, null: false
      t.string :bio, limit: 140, comment: '"Bio" means Biography in social media.'
      t.boolean :personal, null: false, default: false

      t.datetime :deleted_at, index: true
      t.timestamps

      t.index 'lower((webid)::text)', unique: true
    end
  end
end
