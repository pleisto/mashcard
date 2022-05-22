# typed: false
# frozen_string_literal: true

FactoryBot.define do
  factory :docs_block, class: 'Docs::Block' do
    id { SecureRandom.uuid }
    space
    page { true }
    sort { 0 }
    type { 'doc' }
    meta { { title: FFaker::Lorem.phrase } }
    data { {} }
    text { FFaker::Lorem.phrase }
    content { [] }
    collaborators { [space.owner.id] }
  end

  factory :docs_block_child, class: 'Docs::Block' do
    parent { association :docs_block }
    id { SecureRandom.uuid }
    root_id { parent_id }
    space
    page { true }
    sort { 0 }
    type { 'doc' }
    meta { { title: FFaker::Lorem.phrase } }
    data { {} }
    text { FFaker::Lorem.phrase }
    content { [] }
    collaborators { [space.owner.id] }
  end
end
