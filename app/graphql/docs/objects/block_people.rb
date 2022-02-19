# frozen_string_literal: true
module Docs
  module Objects
    class BlockPeople < BlockAttachment
      field :domain, String, "key", null: false
      field :type, Enums::Blocktype, "type", null: true
      field :name, String, "name", null: true
      field :avatar_url, String, "avatar", null: true
    end
  end
end
