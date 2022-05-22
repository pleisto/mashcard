# typed: strict
# frozen_string_literal: true

module Docs
  module Objects
    class BlockPeople < BlockAttachment
      field :avatar_url, String, 'avatar', null: true
      field :domain, String, 'key', null: false
      field :name, String, 'name', null: true
      field :type, Enums::Blocktype, 'type', null: true
    end
  end
end
