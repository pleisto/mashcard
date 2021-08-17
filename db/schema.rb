# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_16_080850) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "accounts_federated_identities", force: :cascade do |t|
    t.bigint "accounts_user_id"
    t.string "provider", null: false
    t.string "uid", null: false, comment: "unique identifier"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accounts_user_id"], name: "index_accounts_federated_identities_on_accounts_user_id"
    t.index ["provider", "uid"], name: "index_accounts_federated_identities_on_provider_and_uid", unique: true
  end

  create_table "accounts_users", force: :cascade do |t|
    t.string "email"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "locale", limit: 17, comment: "BCP47 language codes."
    t.string "timezone"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_accounts_users_on_confirmation_token", unique: true
    t.index ["deleted_at"], name: "index_accounts_users_on_deleted_at"
    t.index ["email"], name: "index_accounts_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_accounts_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_accounts_users_on_unlock_token", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_id", null: false
    t.string "record_type", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.bigint "pod_id"
    t.bigint "user_id"
    t.uuid "block_id"
    t.string "operation_type", default: "THIRD", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "brickdoc_configs", force: :cascade do |t|
    t.string "key", null: false
    t.text "value"
    t.string "scope", null: false
    t.string "domain", null: false
    t.integer "domain_len"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["key", "scope", "domain"], name: "index_brickdoc_configs_on_key_and_scope_and_domain", unique: true
  end

  create_table "docs_blocks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "pod_id"
    t.string "type", limit: 32
    t.uuid "parent_id"
    t.string "parent_type", limit: 32
    t.jsonb "meta", default: {}, null: false, comment: "metadata"
    t.jsonb "data", null: false, comment: "data props"
    t.bigint "history_version", default: 0, null: false
    t.bigint "snapshot_version", default: 0, null: false
    t.bigint "sort", default: 0
    t.bigint "collaborators", default: [], null: false, array: true
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "root_id"
    t.index ["collaborators"], name: "index_docs_blocks_on_collaborators", using: :gin
    t.index ["deleted_at"], name: "index_docs_blocks_on_deleted_at"
    t.index ["parent_id"], name: "index_docs_blocks_on_parent_id"
    t.index ["pod_id"], name: "index_docs_blocks_on_pod_id"
  end

  create_table "docs_histories", force: :cascade do |t|
    t.bigint "pod_id"
    t.jsonb "meta", null: false
    t.jsonb "data", null: false
    t.uuid "block_id", null: false
    t.uuid "parent_id"
    t.string "parent_type"
    t.string "type", limit: 32
    t.bigint "sort", null: false
    t.bigint "history_version", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["block_id", "history_version"], name: "index_docs_histories_on_block_id_and_history_version", unique: true, comment: "history identifier"
    t.index ["pod_id"], name: "index_docs_histories_on_pod_id"
  end

  create_table "docs_share_links", force: :cascade do |t|
    t.uuid "block_id", null: false, comment: "Page id"
    t.bigint "pod_id", null: false
    t.bigint "user_id"
    t.string "key", null: false, comment: "Unique key"
    t.bigint "state", default: 0, null: false, comment: "Status"
    t.string "policy", null: false, comment: "Share policy"
    t.json "payload"
    t.datetime "expired_at"
    t.bigint "target_pod_ids", default: [], null: false, array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["block_id", "state", "policy"], name: "index_docs_share_links_on_block_id_and_state_and_policy"
    t.index ["key"], name: "index_docs_share_links_on_key", unique: true
    t.index ["target_pod_ids"], name: "index_docs_share_links_on_target_pod_ids", using: :gin
  end

  create_table "docs_snapshots", force: :cascade do |t|
    t.bigint "pod_id"
    t.uuid "block_id", null: false
    t.bigint "snapshot_version", null: false
    t.jsonb "version_meta", comment: "child block_id and history_version map"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["block_id", "snapshot_version"], name: "index_docs_snapshots_on_block_id_and_snapshot_version", unique: true, comment: "snapshot identifier"
    t.index ["pod_id"], name: "index_docs_snapshots_on_pod_id"
  end

  create_table "flipper_features", force: :cascade do |t|
    t.string "key", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["key"], name: "index_flipper_features_on_key", unique: true
  end

  create_table "flipper_gates", force: :cascade do |t|
    t.string "feature_key", null: false
    t.string "key", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["feature_key", "key", "value"], name: "index_flipper_gates_on_feature_key_and_key_and_value", unique: true
  end

  create_table "pods", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.string "webid", null: false
    t.string "name", null: false
    t.string "bio", limit: 140, comment: "\"Bio\" means Biography in social media."
    t.boolean "personal", default: false, null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index "lower((webid)::text)", name: "index_pods_on_lower_webid_text", unique: true
    t.index ["deleted_at"], name: "index_pods_on_deleted_at"
    t.index ["owner_id"], name: "index_pods_on_owner_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
