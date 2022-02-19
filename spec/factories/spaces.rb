# frozen_string_literal: true
FactoryBot.define do
  factory :space do
    association :owner
    before(:create) do |space|
      name = FFaker::Company.name
      space.name = name
      space.domain = "#{name.parameterize}#{Time.now.to_i}#{SecureRandom.hex(2)}"
    end
  end
end
