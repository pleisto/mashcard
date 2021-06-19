# frozen_string_literal: true
class CreateAccountsFederatedIdentities < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts_federated_identities do |t|
      t.belongs_to :accounts_user
      t.string :provider, null: false
      t.string :uid, null: false, comment: 'unique identifier'
      t.index  [:provider, :uid], unique: true
      t.timestamps
    end
  end
end
