# frozen_string_literal: true
FactoryBot.define do
  factory :accounts_team, class: 'Accounts::Team' do
    association :owner
    before(:create) do |team|
      name = FFaker::Company.name
      team.name = name
      team.webid = "#{name.parameterize}#{Time.now.to_i}"
    end
  end
end
