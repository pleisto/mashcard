# frozen_string_literal: true
FactoryBot.define do
  factory :accounts_user, class: 'Accounts::User', aliases: [:owner] do
    name { FFaker::Name.name }
    webid { "#{FFaker::Lorem.word}#{Time.now.to_i}" }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
  end
end
