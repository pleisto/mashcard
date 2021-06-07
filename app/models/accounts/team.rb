# frozen_string_literal: true
class Accounts::Team < Accounts::Pod
  HIDDEN_FIELDS = [
    :email, :encrypted_password, :reset_password_token,
    :reset_password_sent_at, :remember_created_at,
    :sign_in_count, :current_sign_in_at, :last_sign_in_at,
    :current_sign_in_ip, :last_sign_in_ip, :confirmation_token,
    :confirmed_at, :confirmation_sent_at, :unconfirmed_email,
    :failed_attempts, :unlock_token, :locked_at, :timezone, :locale
  ]
  include HiddenFields
end
