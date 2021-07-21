# frozen_string_literal: true

module Docs
  class Enums::Patchtype < BrickGraphQL::BaseEnum
    value "ADD", "ADD"
    value "UPDATE", "UPDATE"
    value "DELETE", "DELETE"
  end
end
