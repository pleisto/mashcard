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

ActiveRecord::Schema.define(version: 2021_06_19_175028) do

  # These are extensions that must be enabled in order to support this database
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

  create_table "docs_blocks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "pod_id"
    t.string "type", limit: 32
    t.uuid "parent_id"
    t.string "parent_type", limit: 32
    t.jsonb "meta", default: {}, null: false, comment: "metadata"
    t.jsonb "data", null: false, comment: "data props"
    t.uuid "children", array: true
    t.bigint "version", default: 0, null: false
    t.bigint "collaborators", default: [], null: false, array: true
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["children"], name: "index_docs_blocks_on_children", using: :gin
    t.index ["collaborators"], name: "index_docs_blocks_on_collaborators", using: :gin
    t.index ["deleted_at"], name: "index_docs_blocks_on_deleted_at"
    t.index ["parent_id"], name: "index_docs_blocks_on_parent_id"
    t.index ["pod_id"], name: "index_docs_blocks_on_pod_id"
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
    t.string "avatar_uri", limit: 128, comment: "object key for bucket or url that stored avatar."
    t.string "bio", limit: 140, comment: "\"Bio\" means Biography in social media."
    t.boolean "personal", default: false, null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index "lower((webid)::text)", name: "index_pods_on_lower_webid_text", unique: true
    t.index ["deleted_at"], name: "index_pods_on_deleted_at"
    t.index ["owner_id"], name: "index_pods_on_owner_id"
  end

  create_table "settings", force: :cascade do |t|
    t.string "var", null: false
    t.text "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["var"], name: "index_settings_on_var", unique: true
  end

end
