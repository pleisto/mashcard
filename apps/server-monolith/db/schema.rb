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

ActiveRecord::Schema[7.0].define(version: 2022_06_21_070648) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "ltree"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "block_state_type", ["full", "update"]
  create_enum "block_type", ["document", "component"]
  create_enum "pod_type", ["User", "Group"]

  create_table "accounts_federated_identities", force: :cascade do |t|
    t.bigint "accounts_user_id"
    t.string "provider", null: false
    t.string "uid", null: false, comment: "unique identifier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["accounts_user_id"], name: "index_accounts_federated_identities_on_accounts_user_id"
    t.index ["provider", "uid"], name: "index_accounts_federated_identities_on_provider_and_uid", unique: true
  end

  create_table "accounts_notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "notification_type", null: false
    t.json "data", default: {}, null: false, comment: "Notification data"
    t.integer "status", null: false, comment: "Unread / read / deleted"
    t.string "source_id"
    t.string "source_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["source_type", "source_id"], name: "index_accounts_notifications_on_source_type_and_source_id"
    t.index ["user_id"], name: "index_accounts_notifications_on_user_id"
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
    t.string "checksum"
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

  create_table "docs_aliases", force: :cascade do |t|
    t.bigint "pod_id", null: false
    t.string "alias", null: false
    t.uuid "block_id", null: false
    t.json "payload", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "state", default: 0, null: false
    t.index ["block_id"], name: "index_docs_aliases_on_block_id"
    t.index ["pod_id", "alias"], name: "index_docs_aliases_on_pod_id_and_alias", unique: true
  end

  create_table "docs_block_states", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.enum "state_type", default: "full", null: false, enum_type: "block_state_type"
    t.uuid "block_id", null: false
    t.binary "state"
    t.uuid "prev_state_id"
    t.bigint "pod_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.uuid "history_id", null: false
    t.uuid "document_id", null: false
  end

  create_table "docs_blocks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "pod_id", null: false
    t.string "type", limit: 32
    t.uuid "parent_id"
    t.jsonb "meta", default: {}, null: false, comment: "metadata"
    t.jsonb "data", null: false, comment: "data props"
    t.bigint "history_version", default: 0, null: false
    t.bigint "snapshot_version", default: 0, null: false
    t.bigint "sort", default: 0, null: false
    t.bigint "collaborators", default: [], null: false, array: true
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "root_id", null: false
    t.jsonb "content", default: [], comment: "node content"
    t.text "text", default: "", comment: "node text"
    t.boolean "page", default: false, null: false
    t.datetime "deleted_permanently_at"
    t.uuid "state_id"
    t.enum "block_type", enum_type: "block_type"
    t.index ["collaborators"], name: "index_docs_blocks_on_collaborators", using: :gin
    t.index ["parent_id"], name: "index_docs_blocks_on_parent_id"
    t.index ["pod_id"], name: "index_docs_blocks_on_pod_id"
  end

  create_table "docs_comments", force: :cascade do |t|
    t.bigint "conversation_id", null: false
    t.bigint "creator_id", null: false
    t.json "content", null: false, comment: "Comment content"
    t.integer "status", null: false, comment: "deleted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_docs_comments_on_conversation_id"
    t.index ["creator_id"], name: "index_docs_comments_on_creator_id"
  end

  create_table "docs_conversations", force: :cascade do |t|
    t.bigint "pod_id", null: false
    t.uuid "mark_ids", default: [], comment: "Mark ids", array: true
    t.uuid "block_ids", default: [], comment: "Block ids", array: true
    t.uuid "doc_id", null: false
    t.bigint "creator_id", null: false
    t.bigint "collaborators", default: [], null: false, array: true
    t.integer "status", null: false, comment: "opened / resolved / deleted"
    t.datetime "latest_reply_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["collaborators"], name: "index_docs_conversations_on_collaborators", using: :gin
    t.index ["creator_id"], name: "index_docs_conversations_on_creator_id"
    t.index ["doc_id"], name: "index_docs_conversations_on_doc_id"
    t.index ["pod_id"], name: "index_docs_conversations_on_pod_id"
  end

  create_table "docs_document_histories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "document_id", null: false
    t.bigint "pod_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
  end

  create_table "docs_formulas", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "pod_id", null: false
    t.uuid "block_id", null: false
    t.string "name", null: false
    t.text "definition", null: false
    t.json "cache_value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "version", default: 0, null: false
    t.integer "type", default: 0, null: false
    t.json "meta", default: {}, null: false
    t.index ["block_id", "name"], name: "index_docs_formulas_on_block_id_and_name", unique: true
    t.index ["pod_id"], name: "index_docs_formulas_on_pod_id"
  end

  create_table "docs_pins", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "pod_id", null: false
    t.uuid "block_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "pod_id", "block_id"], name: "index_docs_pins_on_user_id_and_pod_id_and_block_id", unique: true
  end

  create_table "docs_share_links", force: :cascade do |t|
    t.uuid "block_id", null: false, comment: "Page id"
    t.bigint "pod_id", null: false
    t.string "key", null: false, comment: "Unique key"
    t.bigint "state", default: 0, null: false, comment: "Status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "policy", null: false
    t.bigint "share_pod_id"
    t.index ["key"], name: "index_docs_share_links_on_key", unique: true
    t.index ["share_pod_id"], name: "index_docs_share_links_on_share_pod_id"
  end

  create_table "flipper_features", force: :cascade do |t|
    t.string "key", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_flipper_features_on_key", unique: true
  end

  create_table "flipper_gates", force: :cascade do |t|
    t.string "feature_key", null: false
    t.string "key", null: false
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feature_key", "key", "value"], name: "index_flipper_gates_on_feature_key_and_key_and_value", unique: true
  end

  create_table "groups_members", force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role", null: false
    t.integer "state", default: 0, null: false
    t.index ["group_id"], name: "index_accounts_members_on_group_id"
    t.index ["user_id"], name: "index_accounts_members_on_user_id"
  end

  create_table "mashcard_configs", force: :cascade do |t|
    t.ltree "key", null: false, comment: "setting key with namespace"
    t.ltree "scope", default: "R", null: false, comment: "scope for recursive search. e.g. R.user_1.pod_2 or R.pod_1"
    t.jsonb "value"
    t.index ["key", "scope"], name: "index_mashcard_configs_on_key_and_scope", unique: true
  end

  create_table "pods", force: :cascade do |t|
    t.string "username", null: false
    t.string "display_name", null: false
    t.string "bio", limit: 140, comment: "\"Bio\" means Biography in social media."
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.enum "type", null: false, enum_type: "pod_type"
    t.datetime "suspended_at", comment: "the date when the user was suspended"
    t.integer "suspended_reason", default: 0, comment: "enumeration value for the reason for the user suspension"
    t.string "external_avatar_url"
    t.string "last_pod_username"
    t.json "last_block_ids", default: {}, null: false
    t.index "lower((username)::text)", name: "index_pods_on_lower_username_text", unique: true
    t.index ["deleted_at"], name: "index_pods_on_deleted_at"
    t.index ["type"], name: "index_pods_on_type"
  end

  create_table "users_authentications", force: :cascade do |t|
    t.bigint "user_id", null: false
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
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_authentications_on_confirmation_token", unique: true
    t.index ["deleted_at"], name: "index_users_authentications_on_deleted_at"
    t.index ["email"], name: "index_users_authentications_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_authentications_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_authentications_on_unlock_token", unique: true
    t.index ["user_id"], name: "index_users_authentications_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "users_authentications", "pods", column: "user_id"
end
