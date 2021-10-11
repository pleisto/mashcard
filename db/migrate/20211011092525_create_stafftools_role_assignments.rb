# frozen_string_literal: true
class CreateStafftoolsRoleAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :stafftools_role_assignments do |t|
      t.references :accounts_user, null: false, foreign_key: true
      t.references :stafftools_role, null: false, foreign_key: true

      t.timestamps
    end
  end
end
