# frozen_string_literal: true

# == Schema Information
#
# Table name: users_authentications
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  deleted_at             :datetime
#  email                  :string
#  encrypted_password     :string           default(""), not null
#  failed_attempts        :integer          default(0), not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  locked_at              :datetime
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string
#  unlock_token           :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  user_id                :bigint           not null
#
# Indexes
#
#  index_users_authentications_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_authentications_on_deleted_at            (deleted_at)
#  index_users_authentications_on_email                 (email) UNIQUE
#  index_users_authentications_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_authentications_on_unlock_token          (unlock_token) UNIQUE
#  index_users_authentications_on_user_id               (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => pods.id)
#
module Users
  class Authentication < ApplicationRecord
    include Hashedidable

    belongs_to :user, optional: true

    ## Devise
    devise :database_authenticatable, :registerable, :lockable, :async,
      :recoverable, :rememberable, :confirmable, :trackable, :omniauthable, :validatable

    has_many :federated_identities, class_name: 'Users::AuthenticationFederatedIdentity',
      foreign_key: :users_authentication_id, inverse_of: :authentication, dependent: :destroy

    validates :username, presence: true, on: :create
    validates :display_name, presence: true, on: :create

    # Make devise happy
    def name
      user&.display_name || email
    end

    # Extra props on create
    attr_accessor :omniauth_provider, :omniauth_uid

    # Pass to user
    attr_accessor :username, :display_name, :external_avatar_url

    before_create :create_user!
    after_save :bind_federation_identity!

    # Setup user_id before create
    def create_user!
      self.user_id = User.create!({ username: username, display_name: display_name,
                                    external_avatar_url: external_avatar_url, }.compact).id
    end

    # Maybe setup federated identity after save
    def bind_federation_identity!
      return unless omniauth_provider.present? && omniauth_uid.present?

      federated_identities.find_or_create_by!(provider: omniauth_provider, uid: omniauth_uid)
    end

    # When federated identity is not available, the password field is required
    def email_required?
      # 1. omniauth_provider exists
      return false if omniauth_provider.present?

      # 2. federated_identities exists
      return false if federated_identities.present?

      true
    end

    def password_required?
      email_required? ? super : false
    end

    # User who authenticated with federated identity can still sign in even if their email is not confirmed.
    def confirmation_period_valid?
      email_required? ? super : true
    end

    def self.email_available?(email)
      instance = new
      instance.email = email
      return { success: true, message: 'ok' } if instance.valid?

      errors = instance.errors[:email]

      if errors.blank?
        { success: true, message: 'ok' }
      else
        { success: false, message: errors.first }
      end
    end

    def self.password_available?(password)
      instance = new
      instance.password = password
      return { success: true, message: 'ok' } if instance.valid?

      errors = instance.errors[:password]

      if errors.blank?
        { success: true, message: 'ok' }
      else
        { success: false, message: errors.first }
      end
    end

    def destroy_authentication!
      federated_identities.destroy_all
      # split personal data to make compliance with GDPR
      masking_data = {
        current_sign_in_ip: '',
        last_sign_in_ip: '',
      }
      masking_data['encrypted_password'] = '' if encrypted_password.present?
      masking_data['unconfirmed_email'] =
        "#{unconfirmed_email.to_data_masking}.#{id}@#{hashed_id}.localhost" if unconfirmed_email.present?
      masking_data['email'] = "#{email.to_data_masking}@#{hashed_id}.localhost" if email.present?

      # all validates and callbacks are skipped
      update_columns(masking_data)
    end
  end
end
