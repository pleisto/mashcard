# frozen_string_literal: true
module Docs
  module Objects
    class ShareLink < BrickGraphQL::BaseObject
      field :key, String, null: false
    end
  end
end
