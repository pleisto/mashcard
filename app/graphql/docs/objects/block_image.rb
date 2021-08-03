# frozen_string_literal: true
module Docs
  module Objects
    class BlockImage < BrickGraphQL::BaseObject
      field :type, String, 'type', null: false
      field :url, String, 'url', null: false
    end
  end
end
