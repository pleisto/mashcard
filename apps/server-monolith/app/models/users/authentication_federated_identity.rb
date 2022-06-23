# frozen_string_literal: true

# == Schema Information
#
# Table name: users_authentication_federated_identities
#
#  id                        :bigint           not null, primary key
#  provider                  :string           not null
#  uid(unique identifier)    :string           not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  users_authentication_id   :bigint
#
# Indexes
#
#  index_federated_identities_on_provider_and_uid         (provider,uid) UNIQUE
#  index_federated_identities_on_users_authentication_id  (users_authentication_id)
#
module Users
  class AuthenticationFederatedIdentity < ApplicationRecord
    belongs_to :authentication, class_name: 'Users::Authentication', foreign_key: :users_authentication_id,
      inverse_of: :federated_identities

    second_level_cache expires_in: 1.week

    validates :uid, :provider, presence: true
    validates :uid, uniqueness: { scope: :provider }
  end
end
