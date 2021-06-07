# frozen_string_literal: true

class DeviseCreateAccountsPods < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts_pods do |t|
      t.string :type, limit: 20, null: false, index: true
      t.string :webid, null: false
      t.string :name, null: false
      t.belongs_to :owner, null: true

      ## Database authenticatable
      t.string :email,              null: true
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable

      ## Lockable
      t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
      t.string   :unlock_token # Only if unlock strategy is :email or :both
      t.datetime :locked_at

      t.string :avatar_key, limit: 128, comment: "object key for bucket that stored avatar."
      t.string :bio, limit: 140, comment: "\"Bio\" means Biography in social media."
      t.string :location, limit: 50
      t.string :locale, limit: 17, comment: "BCP47 language codes."
      t.string :timezone
      t.datetime :deleted_at, index: true

      t.timestamps null: false
    end

    add_index :accounts_pods, 'lower((webid)::text)', unique: true
    add_index :accounts_pods, :email,                unique: true
    add_index :accounts_pods, :reset_password_token, unique: true
    add_index :accounts_pods, :confirmation_token,   unique: true
    add_index :accounts_pods, :unlock_token,         unique: true
  end
end
