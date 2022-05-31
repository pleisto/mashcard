# frozen_string_literal: true

module System
  module Objects
    class ThinUser < BrickGraphQL::BaseObject
      description 'Like spaceMember but thin'
      field :avatar_data, Avatar, 'Space Avatar', null: true
      field :domain, String, 'Like a username, Unique within this instance of Brickdoc', null: false
      field :email, String, 'owner email', null: true
      field :name, String, 'Space Name', null: false
    end
  end
end
