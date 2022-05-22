# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class BlockEmbedMeta < BlockAttachment
      field :embed_type, Enums::Embedtype, 'embedType', null: true
      field :type, String, 'type', null: true
    end
  end
end
