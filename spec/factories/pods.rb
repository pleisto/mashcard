# frozen_string_literal: true
FactoryBot.define do
  factory :pod do
    association :owner
    before(:create) do |pod|
      name = FFaker::Company.name
      pod.name = name
      pod.webid = "#{name.parameterize}#{Time.now.to_i}#{SecureRandom.hex(2)}"
    end
  end
end
