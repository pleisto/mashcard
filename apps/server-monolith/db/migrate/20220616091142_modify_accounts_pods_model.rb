# frozen_string_literal: true

class ModifyAccountsPodsModel < ActiveRecord::Migration[7.0]
  def up
    drop_table :accounts_users

    drop_table :pods
    create_enum 'pod_type', ['User', 'Group']
    create_table 'pods', force: :cascade do |t|
      t.string 'username', null: false
      t.string 'display_name', null: false
      t.string 'bio', limit: 140, comment: '"Bio" means Biography in social media.'
      t.datetime 'deleted_at'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index 'lower((username)::text)', name: 'index_pods_on_lower_username_text', unique: true
      t.index ['deleted_at'], name: 'index_pods_on_deleted_at'

      t.enum 'type', null: false, enum_type: :pod_type
      t.index ['type'], name: 'index_pods_on_type'

      t.datetime 'suspended_at', comment: 'the date when the user was suspended'
      t.integer 'suspended_reason', default: 0, comment: 'enumeration value for the reason for the user suspension'
      t.string 'external_avatar_url'
      t.string 'last_pod_username'
      t.json 'last_block_ids', default: {}, null: false
    end

    create_table 'users_authentications', force: :cascade do |t|
      t.belongs_to 'user', null: false, foreign_key: { to_table: 'pods' }
      t.string 'email'
      t.string 'encrypted_password', default: '', null: false
      t.string 'reset_password_token'
      t.datetime 'reset_password_sent_at'
      t.datetime 'remember_created_at'
      t.integer 'sign_in_count', default: 0, null: false
      t.datetime 'current_sign_in_at'
      t.datetime 'last_sign_in_at'
      t.string 'current_sign_in_ip'
      t.string 'last_sign_in_ip'
      t.string 'confirmation_token'
      t.datetime 'confirmed_at'
      t.datetime 'confirmation_sent_at'
      t.string 'unconfirmed_email'
      t.integer 'failed_attempts', default: 0, null: false
      t.string 'unlock_token'
      t.datetime 'locked_at'
      t.datetime 'deleted_at'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index ['confirmation_token'], unique: true
      t.index ['deleted_at']
      t.index ['email'], unique: true
      t.index ['reset_password_token'], unique: true
      t.index ['unlock_token'], unique: true
    end

    drop_table :accounts_members
    create_table 'groups_members', force: :cascade do |t|
      t.bigint 'group_id', null: false
      t.bigint 'user_id', null: false
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.integer 'role', null: false
      t.integer 'state', default: 0, null: false
      t.index ['group_id'], name: 'index_accounts_members_on_group_id'
      t.index ['user_id'], name: 'index_accounts_members_on_user_id'
    end

    drop_table :accounts_federated_identities

    create_table 'users_authentication_federated_identities', force: :cascade do |t|
      t.bigint 'users_authentication_id'
      t.string 'provider', null: false
      t.string 'uid', null: false, comment: 'unique identifier'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index ['users_authentication_id'], name: 'index_federated_identities_on_users_authentication_id' ## NOTE: index name too long
      t.index ['provider', 'uid'], name: 'index_federated_identities_on_provider_and_uid', unique: true  ## NOTE: index name too long
    end

    drop_table :accounts_notifications

    create_table 'notifications', force: :cascade do |t|
      t.bigint 'user_id', null: false
      t.integer 'notification_type', null: false
      t.json 'data', default: {}, null: false, comment: 'Notification data'
      t.integer 'status', null: false, comment: 'Unread / read / deleted'
      t.string 'source_id'
      t.string 'source_type'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index ['source_type', 'source_id'], name: 'index_notifications_on_source_type_and_source_id'
      t.index ['user_id'], name: 'index_notifications_on_user_id'
    end
  end

  def down
    create_table 'accounts_users', force: :cascade do |t|
      t.string 'email'
      t.string 'encrypted_password', default: '', null: false
      t.string 'reset_password_token'
      t.datetime 'reset_password_sent_at'
      t.datetime 'remember_created_at'
      t.integer 'sign_in_count', default: 0, null: false
      t.datetime 'current_sign_in_at'
      t.datetime 'last_sign_in_at'
      t.string 'current_sign_in_ip'
      t.string 'last_sign_in_ip'
      t.string 'confirmation_token'
      t.datetime 'confirmed_at'
      t.datetime 'confirmation_sent_at'
      t.string 'unconfirmed_email'
      t.integer 'failed_attempts', default: 0, null: false
      t.string 'unlock_token'
      t.datetime 'locked_at'
      t.datetime 'deleted_at'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.string 'last_pod_domain'
      t.json 'last_block_ids', default: {}, null: false
      t.index ['confirmation_token'], name: 'index_accounts_users_on_confirmation_token', unique: true
      t.index ['deleted_at'], name: 'index_accounts_users_on_deleted_at'
      t.index ['email'], name: 'index_accounts_users_on_email', unique: true
      t.index ['reset_password_token'], name: 'index_accounts_users_on_reset_password_token', unique: true
      t.index ['unlock_token'], name: 'index_accounts_users_on_unlock_token', unique: true
    end

    drop_table :pods
    execute <<-SQL.squish
      DROP TYPE pod_type;
    SQL

    create_table 'pods', force: :cascade do |t|
      t.bigint 'owner_id', null: false
      t.string 'domain', null: false
      t.string 'name', null: false
      t.string 'bio', limit: 140, comment: '"Bio" means Biography in social media.'
      t.boolean 'personal', default: false, null: false
      t.datetime 'deleted_at'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.boolean 'invite_enable', default: false, null: false
      t.string 'invite_secret'
      t.index 'lower((domain)::text)', name: 'index_pods_on_lower_domain_text', unique: true
      t.index ['deleted_at'], name: 'index_pods_on_deleted_at'
      t.index ['invite_secret'], name: 'index_pods_on_invite_secret', unique: true
      t.index ['owner_id'], name: 'index_pods_on_owner_id'
    end

    drop_table :groups_members
    create_table 'accounts_members', force: :cascade do |t|
      t.bigint 'pod_id', null: false
      t.bigint 'user_id', null: false
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.integer 'role', null: false
      t.integer 'state', default: 0, null: false
      t.index ['pod_id'], name: 'index_accounts_members_on_pod_id'
      t.index ['user_id'], name: 'index_accounts_members_on_user_id'
    end

    drop_table :users_authentications

    create_table 'accounts_federated_identities', force: :cascade do |t|
      t.bigint 'accounts_user_id'
      t.string 'provider', null: false
      t.string 'uid', null: false, comment: 'unique identifier'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index ['accounts_user_id'], name: 'index_accounts_federated_identities_on_accounts_user_id'
      t.index ['provider', 'uid'], name: 'index_accounts_federated_identities_on_provider_and_uid', unique: true
    end

    drop_table :users_authentication_federated_identities

    create_table 'accounts_notifications', force: :cascade do |t|
      t.bigint 'user_id', null: false
      t.integer 'notification_type', null: false
      t.json 'data', default: {}, null: false, comment: 'Notification data'
      t.integer 'status', null: false, comment: 'Unread / read / deleted'
      t.string 'source_id'
      t.string 'source_type'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index ['source_type', 'source_id'], name: 'index_accounts_notifications_on_source_type_and_source_id'
      t.index ['user_id'], name: 'index_accounts_notifications_on_user_id'
    end

    drop_table :notifications
  end
end
