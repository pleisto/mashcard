# frozen_string_literal: true
class Accounts::User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :lockable,
         :recoverable, :rememberable, :confirmable, :trackable, :omniauthable, :validatable

  # Pod
  has_many :pods, class_name: 'Pod', foreign_key: :owner_id, inverse_of: :owner

  has_one :personal_pod, -> { where(personal: true) },
          class_name: 'Pod', dependent: :destroy,
          foreign_key: :owner_id, inverse_of: :owner, autosave: true

  delegate :webid, :webid=, :name, :name=, :bio, :bio=, :avatar, :avatar_uri, :avatar_uri=,
           to: :personal_pod
  alias_method :original_personal_pod, :personal_pod

  def personal_pod
    original_personal_pod || build_personal_pod
  end

  # FederatedIdentity
  has_many :federated_identities, class_name: 'Accounts::FederatedIdentity',
           foreign_key: :accounts_user_id, inverse_of: :user, dependent: :destroy
  attr_accessor :omniauth_provider, :omniauth_uid
  after_commit :bind_federation_identity, if: proc { omniauth_provider.present? }, on: [:create, :update]

  def bind_federation_identity
    Accounts::FederatedIdentity.find_or_create_by!(provider: omniauth_provider, uid: omniauth_uid, accounts_user_id: id)
  end

  # Devise Overwrite

  # When federated identity is not available, the password field is required
  def email_required?
    federated_identities.blank? &&
      omniauth_provider.blank? # federated identity are not created until the User is created.
  end

  def password_required?
    email_required?
  end

  # User who authenticated with federated identity can still sign in even if their email is not confirmed.
  def confirmation_period_valid?
    email_required? ? super : true
  end
end
