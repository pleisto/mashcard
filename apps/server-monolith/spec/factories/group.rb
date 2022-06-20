# frozen_string_literal: true

FactoryBot.define do
  factory :group, class: 'Group', aliases: [:pod] do
    display_name { FFaker::Name.name }
    username { "#{FFaker::Lorem.word}#{Time.now.to_i}#{SecureRandom.hex(2)}" }
    owner_id { create(:owner).id }
  end
end
