# frozen_string_literal: true
class Accounts::User < Accounts::Pod
  HIDDEN_FIELDS = [:owner_id]
  include HiddenFields

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :lockable,
         :recoverable, :rememberable, :confirmable, :trackable, :omniauthable, :validatable

  has_many :federated_identities, class_name: 'Accounts::FederatedIdentity'

  attr_accessor :omniauth_provider, :omniauth_uid
  after_create :bind_federation_identity, if: :omniauth_provider.present?

  # FederatedIdentity
  def bind_federation_identity
    Accounts::FederatedIdentity.find_or_create_by!(provider: omniauth_provider, uid: omniauth_uid, user_id: id)
  end

  # Devise Overwrite

  # When federated identity is not available, the password is required
  def email_required?
    federated_identities.blank? &&
      omniauth_provider.blank? # federated identity are not created until the User is created.
  end
end
