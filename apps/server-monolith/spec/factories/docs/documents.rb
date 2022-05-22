# typed: false
# frozen_string_literal: true

FactoryBot.define do
  factory :docs_document, class: 'Docs::Document' do
    id { SecureRandom.uuid }
    state_id { SecureRandom.uuid }
    state { Random.bytes(100) }
  end
end
