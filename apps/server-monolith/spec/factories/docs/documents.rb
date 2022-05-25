# frozen_string_literal: true

FactoryBot.define do
  factory :docs_document, class: 'Docs::Document' do
    id { Brickdoc::Utils::Encoding::UUID.gen_v4 }
    state_id { Brickdoc::Utils::Encoding::UUID.gen_v4 }
    state { Random.bytes(100) }
  end
end
