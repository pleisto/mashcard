# frozen_string_literal: true
FactoryBot.define do
  factory :accounts_federated_identity, class: 'Accounts::FederatedIdentity' do
    accounts_user
    provider { :github }
    uid { FFaker::PhoneNumber.imei }
  end
end
