# frozen_string_literal: true

module Resolvers
  class Metadata < BaseResolver
    type Types::MashcardMetadata, null: false
    description 'Return information about current MashCard server instance.'

    def resolve
      # metadata cache id == server booted time
      id = Mashcard::BOOTED_AT.to_i
      cache_fragment(id) { OpenStruct.new(id: id, object_class_name: 'Metadata') }
    end
  end
end
