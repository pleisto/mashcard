# frozen_string_literal: true

class Accounts::FederatedIdentity < ApplicationRecord
  belongs_to :accounts_user, class_name: 'Accounts::User'

  second_level_cache expires_in: 1.week

  validates_presence_of :uid, :provider
  validates :uid, uniqueness: { scope: :provider }

  def self.find_user_via(provider, uid)
    where(provider: provider, uid: uid).first
  end
end
