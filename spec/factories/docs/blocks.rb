# frozen_string_literal: true
FactoryBot.define do
  factory :docs_block, class: 'Docs::Block' do
    id { SecureRandom.uuid }
    pod
    type { 'doc' }
    meta { { title: FFaker::Lorem.phrase } }
    data { { paragraphs: FFaker::DizzleIpsum.paragraphs	} }
    collaborators { [pod.owner.id] }
  end

  factory :docs_block_child, class: 'Docs::Block' do
    parent { association :docs_block }
    id { SecureRandom.uuid }
    pod
    type { 'doc' }
    meta { { title: FFaker::Lorem.phrase } }
    data { { paragraphs: FFaker::DizzleIpsum.paragraphs	} }
    collaborators { [pod.owner.id] }
  end
end
