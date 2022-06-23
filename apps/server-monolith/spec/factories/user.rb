# frozen_string_literal: true

FactoryBot.define do
  factory :accounts_user_authentication, class: 'Users::Authentication' do
    display_name { FFaker::Name.name }
    username { "#{FFaker::Lorem.word}#{Time.now.to_i}#{SecureRandom.hex(2)}" }
    email { "#{FFaker::Lorem.word}#{Time.now.to_i}#{SecureRandom.hex(2)}@mashcard.cloud" }
    password { FFaker::Internet.password }
    confirmed_at { Time.now.utc }
  end

  factory :accounts_user_not_confirmed_authentication, class: 'Users::Authentication' do
    display_name { FFaker::Name.name }
    username { "#{FFaker::Lorem.word}#{Time.now.to_i}#{SecureRandom.hex(2)}" }
    email { "#{FFaker::Lorem.word}#{Time.now.to_i}#{SecureRandom.hex(2)}@mashcard.cloud" }
    password { FFaker::Internet.password }
  end

  factory :accounts_user, class: 'User', aliases: [:owner] do
    display_name { FFaker::Name.name }
    username { "#{FFaker::Lorem.word}#{Time.now.to_i}#{SecureRandom.hex(2)}" }
  end
end
