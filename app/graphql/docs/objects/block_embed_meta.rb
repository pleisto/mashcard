# frozen_string_literal: true
module Docs
  module Objects
    class BlockEmbedMeta < BlockAttachment
      field :type, String, "type", null: true
      field :embedType, Enums::Embedtype, "embedType", null: true
    end
  end
end
