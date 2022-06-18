# frozen_string_literal: true

module Types
  module Blocks
    class EmbedMeta < Attachment
      graphql_name 'BlockEmbedMeta'
      field :embed_type, EmbedType, 'embedType', null: true
      field :type, String, 'type', null: true
    end
  end
end
