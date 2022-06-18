# frozen_string_literal: true

module Resolvers
  class Metadata < BaseResolver
    type Types::BrickdocMetadata, null: false
    description 'Return information about current Brickdoc server instance.'

    def resolve
      # metadata cache id == server booted time
      id = Brickdoc::BOOTED_AT.to_i
      cache_fragment(id) { OpenStruct.new(id: id, object_class_name: 'Metadata') }
    end
  end
end
