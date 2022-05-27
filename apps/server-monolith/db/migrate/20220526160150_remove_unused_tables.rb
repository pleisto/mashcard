# frozen_string_literal: true

class RemoveUnusedTables < ActiveRecord::Migration[7.0]
  def change
    # rubocop:disable Rails/ReversibleMigration
    drop_table :stafftools_role_assignments
    drop_table :stafftools_roles
  end
end
