# frozen_string_literal: true
module Docs
  module Objects
    class BlockData < BrickGraphQL::BaseObject
      field :content, [GraphQL::Types::JSON], 'content', null: false
      field :text, String, 'text', null: false
    end
  end
end
