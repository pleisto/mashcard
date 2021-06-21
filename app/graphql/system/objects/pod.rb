# frozen_string_literal: true
module System
  module Objects
    class Pod < BrickGraphQL::BaseObject
      graphql_name 'pod'
      description 'Brickdoc Pod.'
      global_id_field :id

      field :webid, String, 'Like a username, Unique within this instance of Brickdoc', null: false
      field :name, String, 'Pod Name', null: true
      field :avatar, String, 'Pod Avatar', null: true
      field :bio, String, 'public profile bio', null: true
    end
  end
end
