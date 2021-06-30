# frozen_string_literal: true
FactoryBot.define do
  factory :accounts_user, class: 'Accounts::User', aliases: [:owner] do
    name { FFaker::Name.name }
    webid { "#{FFaker::Lorem.word}#{Time.now.to_i}" }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
    confirmed_at { Time.now.utc }
  end

  factory :accounts_user_not_confirmed, class: 'Accounts::User' do
    name { FFaker::Name.name }
    webid { "#{FFaker::Lorem.word}#{Time.now.to_i}" }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
  end
end
