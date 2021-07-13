# frozen_string_literal: true
module Docs
  class Objects::BlockHistory < BrickGraphQL::BaseObject
    has_primary_key
    field :history_version, Int, 'History version', null: false
  end
end
