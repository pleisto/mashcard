# frozen_string_literal: true

FactoryBot.define do
  factory :docs_block, class: 'Docs::Block' do
    id { Brickdoc::Utils::Encoding::UUID.gen_v4 }
    pod
    page { true }
    sort { 0 }
    type { 'doc' }
    meta { { title: FFaker::Lorem.phrase } }
    data { {} }
    text { FFaker::Lorem.phrase }
    content { [] }
    collaborators { [pod.owner.id] }
  end

  factory :docs_block_child, class: 'Docs::Block' do
    parent { association :docs_block }
    id { Brickdoc::Utils::Encoding::UUID.gen_v4 }
    root_id { parent_id }
    pod
    page { true }
    sort { 0 }
    type { 'doc' }
    meta { { title: FFaker::Lorem.phrase } }
    data { {} }
    text { FFaker::Lorem.phrase }
    content { [] }
    collaborators { [pod.owner.id] }
  end
end
