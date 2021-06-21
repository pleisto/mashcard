# frozen_string_literal: true
FactoryBot.define do
  factory :docs_block, class: 'Docs::Block' do
    pod
    type { 'page' }
    meta { { title: FFaker::Lorem.phrase } }
    collaborators { [accounts_user] }
  end
end
