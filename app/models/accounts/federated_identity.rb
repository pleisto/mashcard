# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts_federated_identities
#
#  id                     :bigint           not null, primary key
#  provider               :string           not null
#  uid(unique identifier) :string           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  accounts_user_id       :bigint
#
# Indexes
#
#  index_accounts_federated_identities_on_accounts_user_id  (accounts_user_id)
#  index_accounts_federated_identities_on_provider_and_uid  (provider,uid) UNIQUE
#
class Accounts::FederatedIdentity < ApplicationRecord
  belongs_to :user, class_name: 'Accounts::User', foreign_key: :accounts_user_id

  second_level_cache expires_in: 1.week

  validates_presence_of :uid, :provider
  validates :uid, uniqueness: { scope: :provider }

  def self.find_user_via(provider, uid)
    where(provider: provider, uid: uid).first
  end
end
