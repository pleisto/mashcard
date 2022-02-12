# frozen_string_literal: true
# == Schema Information
#
# Table name: accounts_users
#
#  id                     :integer          not null, primary key
#  email                  :string
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default("0"), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default("0"), not null
#  unlock_token           :string
#  locked_at              :datetime
#  locale                 :string(17)
#  timezone               :string
#  deleted_at             :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  last_webid             :string
#  last_block_ids         :json             default("{}"), not null
#
# Indexes
#
#  index_accounts_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_accounts_users_on_deleted_at            (deleted_at)
#  index_accounts_users_on_email                 (email) UNIQUE
#  index_accounts_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_accounts_users_on_unlock_token          (unlock_token) UNIQUE
#

class Accounts::User < ApplicationRecord
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
      webid: webid,
      name: name
    }
  end

  def save_last_position!(webid, block_id)
    return true if last_webid == webid && last_block_ids[webid] == block_id

    unless last_block_ids.keys.include?(webid)
      return false unless pods.find_by(webid: webid)
    end

    update!(last_webid: webid, last_block_ids: last_block_ids.merge(webid => block_id))
  end

  def self.email_available?(email)
    instance = new
    instance.email = email
    return { success: true, message: "ok" } if instance.valid?

    errors = instance.errors[:email]

    if errors.blank?
      { success: true, message: "ok" }
    else
      { success: false, message: errors.first }
    end
  end

  def self.password_available?(password)
    instance = new
    instance.password = password
    return { success: true, message: "ok" } if instance.valid?

    errors = instance.errors[:password]

    if errors.blank?
      { success: true, message: "ok" }
    else
      { success: false, message: errors.first }
    end
  end

  ## Pod
  has_many :members, -> { enabled }, class_name: 'Accounts::Member'
  has_many :own_pods, class_name: 'Pod', foreign_key: :owner_id, inverse_of: :owner
  has_many :pods, class_name: 'Pod', through: :members

  has_one :personal_pod, -> { where(personal: true) },
          class_name: 'Pod', dependent: :destroy,
          foreign_key: :owner_id, inverse_of: :owner, autosave: true

  delegate :webid, :webid=, :name, :name=, :bio, :bio=, :avatar, :avatar=, :avatar_data,
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
    return personal_pod if last_webid.nil?

    pods.find_by(webid: last_webid) || personal_pod
  end

  ## FederatedIdentity
  has_many :federated_identities, class_name: 'Accounts::FederatedIdentity',
           foreign_key: :accounts_user_id, inverse_of: :user, dependent: :destroy
  attr_accessor :omniauth_provider, :omniauth_uid
  after_commit :bind_federation_identity, if: proc { omniauth_provider.present? }, on: [:create, :update]

  def bind_federation_identity
    Accounts::FederatedIdentity.find_or_create_by!(provider: omniauth_provider, uid: omniauth_uid, accounts_user_id: id)
  end

  ## default values
  default_value_for :locale, BrickdocConfig.default_locale
  default_value_for :timezone, BrickdocConfig.default_timezone

  ## Stafftools
  has_many :stafftools_role_assignments, dependent: :destroy, class_name: 'Stafftools::RoleAssignment', foreign_key: 'accounts_user_id'
  has_many :stafftools_roles, through: :stafftools_role_assignments, class_name: 'Stafftools::Role'

  def stafftools_permissions
    stafftools_roles.map(&:permissions).flatten.uniq
  end

  def has_stafftools_permission?(permission)
    stafftools_permissions.include?(permission)
  end

  def staff?
    Stafftools::RoleAssignment.exists?(accounts_user_id: id)
  end

  def has_team_pods?
    pods.select { |p| !p.personal }.count > 0
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
      last_sign_in_ip: ''
    }
    masking_data['encrypted_password'] = '' if encrypted_password.present?
    masking_data['unconfirmed_email'] = "#{unconfirmed_email.to_data_masking}.#{id}@#{hashed_id}.localhost" if unconfirmed_email.present?
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
