# frozen_string_literal: true

module Types
  module Blocks
    class History < Types::BaseObject
      graphql_name 'BlockHistory'
      has_primary_key
      field :history_version, Int, 'History version', null: false
    end
  end
end
