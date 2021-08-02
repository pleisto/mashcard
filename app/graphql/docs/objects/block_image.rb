# frozen_string_literal: true
module Docs
  module Objects
    class BlockImage < BrickGraphQL::BaseObject
      field :url, String, 'url', null: false
    end
  end
end
