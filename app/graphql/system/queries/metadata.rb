# frozen_string_literal: true

module System
  class Queries::Metadata < BrickGraphQL::BaseResolver
    type Objects::BrickdocMetadata, null: false
    description 'Return information about current Brickdoc server instance.'

    def resolve
      # metadata cache id == server booted time
      OpenStruct.new(id: Brickdoc::BOOTED_AT.to_i, object_class_name: 'System::Metadata')
    end
  end
end
