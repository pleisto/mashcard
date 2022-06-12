# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts_users
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
#  last_block_ids         :json             not null
#  last_pod_domain        :string
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
#
# Indexes
#
#  index_accounts_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_accounts_users_on_deleted_at            (deleted_at)
#  index_accounts_users_on_email                 (email) UNIQUE
#  index_accounts_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_accounts_users_on_unlock_token          (unlock_token) UNIQUE
#

module Accounts
  class User < ApplicationRecord
    acts_as_paranoid
    ## Devise
    devise :database_authenticatable, :registerable, :lockable, :async,
      :recoverable, :rememberable, :confirmable, :trackable, :omniauthable, :validatable

    # When federated identity is not available, the password field is required
    def email_required?
      federated_identities.blank? &&
        omniauth_provider.blank? # federated identity are not created until the User is created.
    end

    def password_required?
      email_required? ? super : false
    end

    # User who authenticated with federated identity can still sign in even if their email is not confirmed.
    def confirmation_period_valid?
      email_required? ? super : true
    end

    def as_global_context
      {
        domain: domain,
        name: name,
      }
    end

    def save_last_position!(domain, block_id)
      return true if last_pod_domain == domain && last_block_ids[domain] == block_id

      unless last_block_ids.key?(domain)
        return false unless pods.find_by(domain: domain)
      end

      update!(last_pod_domain: domain, last_block_ids: last_block_ids.merge(domain => block_id))
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

    def config
      BrickdocConfig.at(user_id: id)
    end

    delegate :timezone, to: :config

    delegate :locale, to: :config

    ## Pod
    has_many :members, -> { enabled }, class_name: 'Accounts::Member', dependent: :destroy, inverse_of: :user
    has_many :own_pods, class_name: 'Pod', foreign_key: :owner_id, inverse_of: :owner, dependent: :restrict_with_error
    has_many :pods, class_name: 'Pod', through: :members

    has_one :personal_pod, -> { where(personal: true) },
      class_name: 'Pod', dependent: :destroy,
      foreign_key: :owner_id, inverse_of: :owner, autosave: true

    delegate :domain, :domain=, :name, :name=, :bio, :bio=, :avatar, :avatar=, :avatar_data,
      to: :personal_pod
    alias_method :original_personal_pod, :personal_pod

    attribute :current_pod_id, :integer
    attribute :current_pod_cache

    def personal_pod
      original_personal_pod || build_personal_pod
    end

    def fetch_current_pod_cache
      return current_pod_cache if current_pod_cache

      current_pod_cache = guess_pod
      current_pod_cache
    end

    def guess_pod
      return personal_pod if last_pod_domain.nil?

      pods.find_by(domain: last_pod_domain) || personal_pod
    end

    ## FederatedIdentity
    has_many :federated_identities, class_name: 'Accounts::FederatedIdentity',
      foreign_key: :accounts_user_id, inverse_of: :user, dependent: :destroy
    attr_accessor :omniauth_provider, :omniauth_uid

    after_commit :bind_federation_identity, if: proc { omniauth_provider.present? }, on: [:create, :update]

    def bind_federation_identity
      Accounts::FederatedIdentity.find_or_create_by!(provider: omniauth_provider, uid: omniauth_uid,
        accounts_user_id: id)
    end

    def has_team_pods?
      pods.count { |p| !p.personal } > 0
    end

    def hashed_id
      BrickGraphQL::ReversibleIntHash.encode(id)
    end

    def destroy_user!
      if has_team_pods?
        errors.add(:base, 'You cannot delete a user with team pods')
        return false
      end

      # split personal data to make compliance with GDPR
      masking_data = {
        current_sign_in_ip: '',
        last_sign_in_ip: '',
      }
      masking_data['encrypted_password'] = '' if encrypted_password.present?
      masking_data['unconfirmed_email'] =
        "#{unconfirmed_email.to_data_masking}.#{id}@#{hashed_id}.localhost" if unconfirmed_email.present?
      masking_data['email'] = "#{email.to_data_masking}@#{hashed_id}.localhost" if email.present?

      ActiveRecord::Base.transaction do
        federated_identities.destroy_all
        personal_pod.destroy_pod!
        # all validatrs and callbacks are skipped
        update_columns(masking_data)
        destroy!
        true
      end
    end
  end
end
