# frozen_string_literal: true
module Docs
  module Objects
    class Block < ::GraphQL::Schema::Union
      graphql_name 'block'
      description 'Brickdoc Docs::Block'
      possible_types PageBlock, TextBlock
    end
  end
end
