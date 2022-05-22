# typed: false
# frozen_string_literal: true

FactoryBot.define do
  factory :stafftools_role_assignment, class: 'Stafftools::RoleAssignment' do
    accounts_user { nil }
    stafftools_role { nil }
  end
end
