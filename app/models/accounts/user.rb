# frozen_string_literal: true
class Accounts::User < Accounts::Pod
  HIDDEN_FIELDS = [:owner_id]
  include HiddenFields

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :lockable,
         :recoverable, :rememberable, :confirmable, :trackable, :omniauthable, :validatable

  has_many :federated_identities, class_name: 'Accounts::FederatedIdentity', foreign_key: :accounts_user_id
  attr_accessor :omniauth_provider, :omniauth_uid
  after_commit :bind_federation_identity, if: proc { omniauth_provider.present? }, on: [:create, :update]

  # FederatedIdentity
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
