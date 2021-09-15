# frozen_string_literal: true
module System
  module Objects
    class Plugin < BrickGraphQL::BaseObject
      graphql_name 'plugin'
      description 'Brickdoc Plugin.'

      field :name, String, 'Plugin Name', null: false
      field :enabled, Boolean, 'Enabled', null: false
      field :version, String, 'version', null: false
      field :logo, String, 'logo', null: false

      # TODO: metadata type
      field :metadata, GraphQL::Types::JSON, 'metadata', null: false
    end
  end
end
