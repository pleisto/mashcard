# frozen_string_literal: true

class CreateMembersTable < ActiveRecord::Migration[7.0]
  # include Brickdoc::Database::MigrationHelpers

  def up
    create_table :accounts_members do |t|
      t.bigint :pod_id, null: false
      t.bigint :user_id, null: false
      t.timestamps null: false

      t.integer :role, null: false
      t.integer :state, null: false, default: 0

      t.index :pod_id
      t.index :user_id
    end

    add_column :pods, :invite_enable, :boolean, null: false, default: false
    add_column :pods, :invite_secret, :string
    add_index :pods, :invite_secret, unique: true

    Accounts::Member.reset_column_information

    Pod.find_each(&:ensure_owner_member!)
  end

  def down
    drop_table :accounts_members
    remove_column :pods, :invite_enable
    remove_column :pods, :invite_secret
  end
end
