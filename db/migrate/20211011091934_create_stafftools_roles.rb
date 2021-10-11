# frozen_string_literal: true
class CreateStafftoolsRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :stafftools_roles do |t|
      t.string :name, null: false
      t.string :permissions, array: true, default: []
      t.index :name, unique: true
      t.timestamps
    end
  end
end
